import {
  type ActivityMetrics,
  type ContributionCalendar,
  type ContributionDay,
  type ContributionWeek,
  type GitHubProfile,
  type GitHubStats,
  type GitHubUser,
  type GraphQLContributionsResponse,
  type LanguageStats,
} from '@/types/github'

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql'

function getToken(): string {
  const token = process.env['GITHUB_TOKEN']
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set')
  }
  return token
}

function getUsername(): string {
  const username = process.env['GITHUB_USERNAME']
  if (!username) {
    throw new Error('GITHUB_USERNAME environment variable is not set')
  }
  return username
}

/**
 * Convert GitHub contribution level to numeric level
 */
function levelToNumber(
  level: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
): 0 | 1 | 2 | 3 | 4 {
  switch (level) {
    case 'NONE':
      return 0
    case 'FIRST_QUARTILE':
      return 1
    case 'SECOND_QUARTILE':
      return 2
    case 'THIRD_QUARTILE':
      return 3
    case 'FOURTH_QUARTILE':
      return 4
  }
}

/**
 * Fetch contribution data via GitHub GraphQL API
 * Also calculates languages weighted by commit count per repo
 */
async function fetchContributions(): Promise<{
  user: GitHubUser
  stats: GitHubStats
  calendar: ContributionCalendar
  languages: LanguageStats[]
}> {
  const token = getToken()
  const username = getUsername()

  const query = `
    query($username: String!) {
      user(login: $username) {
        login
        name
        avatarUrl
        bio
        company
        location
        websiteUrl
        twitterUsername
        createdAt
        followers {
          totalCount
        }
        following {
          totalCount
        }
        repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
        }
        repositoriesContributedTo(contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]) {
          totalCount
        }
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
          totalRepositoryContributions
          restrictedContributionsCount
          contributionCalendar {
            totalContributions
            weeks {
              firstDay
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
          commitContributionsByRepository(maxRepositories: 50) {
            contributions {
              totalCount
            }
            repository {
              nameWithOwner
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
  })

  if (!response.ok) {
    throw new Error(`GitHub API error: ${String(response.status)} ${response.statusText}`)
  }

  const json = (await response.json()) as GraphQLContributionsResponse
  const userData = json.data.user

  if (!userData) {
    throw new Error('User not found or API error')
  }

  const contrib = userData.contributionsCollection

  const githubUser: GitHubUser = {
    login: userData.login,
    name: userData.name,
    avatarUrl: userData.avatarUrl,
    bio: userData.bio,
    company: userData.company,
    location: userData.location,
    blog: userData.websiteUrl,
    twitterUsername: userData.twitterUsername,
    createdAt: userData.createdAt,
  }

  const stats: GitHubStats = {
    totalContributions: contrib.contributionCalendar.totalContributions,
    totalCommits: contrib.totalCommitContributions,
    totalPRs: contrib.totalPullRequestContributions,
    totalPRsReviewed: contrib.totalPullRequestReviewContributions,
    totalIssues: contrib.totalIssueContributions,
    followers: userData.followers.totalCount,
    following: userData.following.totalCount,
    publicRepos: userData.repositories.totalCount,
    privateRepos: contrib.restrictedContributionsCount > 0 ? 1 : 0,
    reposContributedTo: userData.repositoriesContributedTo.totalCount,
  }

  const weeks: ContributionWeek[] = contrib.contributionCalendar.weeks.map((week) => ({
    firstDay: week.firstDay,
    days: week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: levelToNumber(day.contributionLevel),
    })),
  }))

  const calendar: ContributionCalendar = {
    totalContributions: contrib.contributionCalendar.totalContributions,
    weeks,
  }

  // Calculate commit-weighted languages
  const languageTotals: Record<string, { bytes: number; color: string }> = {}

  for (const repoContrib of contrib.commitContributionsByRepository) {
    const commitCount = repoContrib.contributions.totalCount
    const repoLanguages = repoContrib.repository.languages.edges

    // Weight each language by commit count
    for (const langEdge of repoLanguages) {
      const langName = langEdge.node.name
      const langColor = langEdge.node.color ?? '#8b949e'
      // Weight by commit count (more commits = more weight)
      const weightedBytes = langEdge.size * commitCount

      if (languageTotals[langName]) {
        languageTotals[langName].bytes += weightedBytes
      } else {
        languageTotals[langName] = { bytes: weightedBytes, color: langColor }
      }
    }
  }

  const totalBytes = Object.values(languageTotals).reduce((sum, l) => sum + l.bytes, 0)

  const languages: LanguageStats[] =
    totalBytes > 0
      ? Object.entries(languageTotals)
          .map(([name, { bytes, color }]) => ({
            name,
            bytes,
            percentage: Math.round((bytes / totalBytes) * 1000) / 10,
            color,
          }))
          .sort((a, b) => b.bytes - a.bytes)
          .slice(0, 8)
      : []

  return { user: githubUser, stats, calendar, languages }
}

/**
 * Calculate streak metrics from contribution calendar
 */
function calculateActivityMetrics(calendar: ContributionCalendar): ActivityMetrics {
  // Flatten all days into a single array sorted by date
  const allDays: ContributionDay[] = calendar.weeks
    .flatMap((week) => week.days)
    .sort((a, b) => a.date.localeCompare(b.date))

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().slice(0, 10)

  // Calculate current streak (consecutive days ending today or yesterday)
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0
  let activeDaysThisYear = 0
  let activeDaysLast30 = 0
  let totalContributionsLast30 = 0

  const thirtyDaysAgo = new Date(today)
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().slice(0, 10)

  const yearStart = new Date(today.getFullYear(), 0, 1)
  const yearStartStr = yearStart.toISOString().slice(0, 10)

  // Process days in reverse for current streak calculation
  const reversedDays = [...allDays].reverse()
  let foundFirstActiveDay = false

  for (const day of reversedDays) {
    if (day.count > 0) {
      if (!foundFirstActiveDay) {
        // Check if this is today or yesterday (streak can continue)
        const dayDate = new Date(day.date)
        const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))
        if (diffDays <= 1) {
          foundFirstActiveDay = true
          currentStreak = 1
        } else {
          break // Gap too large, no current streak
        }
      } else {
        currentStreak++
      }
    } else if (foundFirstActiveDay) {
      break // Streak broken
    }
  }

  // Calculate longest streak and other metrics
  for (const day of allDays) {
    if (day.count > 0) {
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)

      // Count active days this year
      if (day.date >= yearStartStr) {
        activeDaysThisYear++
      }

      // Count active days in last 30 days
      if (day.date >= thirtyDaysAgoStr && day.date <= todayStr) {
        activeDaysLast30++
        totalContributionsLast30 += day.count
      }
    } else {
      tempStreak = 0
    }
  }

  const averagePerDay =
    activeDaysLast30 > 0 ? Math.round((totalContributionsLast30 / activeDaysLast30) * 10) / 10 : 0

  return {
    currentStreak,
    longestStreak,
    activeDaysThisYear,
    activeDaysLast30,
    averagePerDay,
  }
}

/**
 * Fetch complete GitHub profile data
 */
export async function fetchGitHubProfile(): Promise<GitHubProfile> {
  const { user, stats, calendar, languages } = await fetchContributions()
  const activity = calculateActivityMetrics(calendar)

  return {
    user,
    stats,
    activity,
    contributions: calendar,
    languages,
    fetchedAt: new Date().toISOString(),
  }
}

/**
 * Export individual functions for testing
 */
export const __testing = {
  calculateActivityMetrics,
  levelToNumber,
}
