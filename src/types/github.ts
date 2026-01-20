/**
 * GitHub Profile Types
 *
 * Types for fetching and displaying GitHub activity data
 * via the GitHub GraphQL and REST APIs.
 */

// Core stats focused on activity metrics
export interface GitHubStats {
  totalContributions: number
  totalCommits: number
  totalPRs: number
  totalPRsReviewed: number
  totalIssues: number
  followers: number
  following: number
  publicRepos: number
  privateRepos: number
  reposContributedTo: number
}

// Activity metrics for streaks and engagement
export interface ActivityMetrics {
  currentStreak: number
  longestStreak: number
  activeDaysThisYear: number
  activeDaysLast30: number
  averagePerDay: number
}

// Contribution calendar for heatmap
export interface ContributionDay {
  date: string // YYYY-MM-DD
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
  firstDay: string
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

// Top languages (calculated from repos)
export interface LanguageStats {
  name: string
  percentage: number
  color: string
  bytes: number
}

// GitHub user profile info
export interface GitHubUser {
  login: string
  name: string | null
  avatarUrl: string
  bio: string | null
  company: string | null
  location: string | null
  blog: string | null
  twitterUsername: string | null
  createdAt: string
}

// Complete profile data
export interface GitHubProfile {
  user: GitHubUser
  stats: GitHubStats
  activity: ActivityMetrics
  contributions: ContributionCalendar
  languages: LanguageStats[]
  fetchedAt: string
}

// GraphQL response types
export interface GraphQLContributionsResponse {
  data: {
    user: null | {
      contributionsCollection: {
        totalCommitContributions: number
        totalIssueContributions: number
        totalPullRequestContributions: number
        totalPullRequestReviewContributions: number
        totalRepositoryContributions: number
        restrictedContributionsCount: number
        contributionCalendar: {
          totalContributions: number
          weeks: {
            firstDay: string
            contributionDays: {
              date: string
              contributionCount: number
              contributionLevel:
                | 'NONE'
                | 'FIRST_QUARTILE'
                | 'SECOND_QUARTILE'
                | 'THIRD_QUARTILE'
                | 'FOURTH_QUARTILE'
            }[]
          }[]
        }
        commitContributionsByRepository: {
          contributions: {
            totalCount: number
          }
          repository: {
            nameWithOwner: string
            languages: {
              edges: {
                size: number
                node: {
                  name: string
                  color: string | null
                }
              }[]
            }
          }
        }[]
      }
      followers: {
        totalCount: number
      }
      following: {
        totalCount: number
      }
      repositories: {
        totalCount: number
      }
      repositoriesContributedTo: {
        totalCount: number
      }
      login: string
      name: string | null
      avatarUrl: string
      bio: string | null
      company: string | null
      location: string | null
      websiteUrl: string | null
      twitterUsername: string | null
      createdAt: string
    }
  }
}

// REST API language response
export type RepoLanguagesResponse = Record<string, number>

// GitHub language colors (subset of common languages)
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  Elixir: '#6e4a7e',
  Haskell: '#5e5086',
  Lua: '#000080',
  R: '#198CE7',
  Julia: '#a270ba',
  Zig: '#ec915c',
  Nix: '#7e7eff',
  OCaml: '#3be133',
  Clojure: '#db5855',
  Erlang: '#B83998',
  Default: '#8b949e',
}
