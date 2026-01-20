#!/bin/bash

# Setup GitHub repository settings including branch protection
# Requires: GitHub CLI (gh) authenticated with appropriate permissions
#
# Usage: ./scripts/setup-github.sh

set -e

REPO="The-Greg-O/greg-overton-site"
BRANCH="main"

echo "Setting up GitHub repository: $REPO"

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed."
    echo "Install it from: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI."
    echo "Run: gh auth login"
    exit 1
fi

echo ""
echo "Configuring branch protection for '$BRANCH'..."

# Enable branch protection using JSON input for proper typing
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/$REPO/branches/$BRANCH/protection" \
  --input - <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["Code Quality", "E2E Tests"]
  },
  "enforce_admins": false,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1
  },
  "restrictions": null,
  "required_linear_history": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
EOF

echo ""
echo "Branch protection configured successfully!"
echo ""
echo "Settings applied:"
echo "  - Require pull request before merging"
echo "  - Require 1 approval"
echo "  - Require code owner review"
echo "  - Dismiss stale reviews on new commits"
echo "  - Require status checks to pass (Code Quality, E2E Tests)"
echo "  - Require branches to be up to date"
echo "  - Require linear history (no merge commits)"
echo "  - Block force pushes"
echo "  - Block branch deletion"
echo ""
echo "Done! Your repository is now configured."
