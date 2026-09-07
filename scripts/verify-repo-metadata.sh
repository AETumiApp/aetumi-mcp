#!/usr/bin/env bash
set -euo pipefail

ORG="AETumiApp"
REPOS=(
  aetumi-mcp
  claude-code-threejs
  threejs-product-viewer
  nextjs-threejs-starter
  webgl-react-components
  threejs-scroll-animation
  react-three-fiber-examples
  3d-web-ai-prompts
  aetumi-3d-web-examples
  aetumi-3d-components
  interactive-3d-web-examples
  aetumi-agency-starter
  ai-coding-3d-web
  webgl-shader-examples
)

printf '%-32s | %-6s | %-7s | %s\n' 'repository' 'desc' 'website' 'topics'
printf '%s\n' '------------------------------------------------------------------------------------------------'

for repo in "${REPOS[@]}"; do
  data=$(gh api "repos/${ORG}/${repo}")
  description=$(jq -r '.description // ""' <<<"$data")
  homepage=$(jq -r '.homepage // ""' <<<"$data")
  topics=$(jq -r '[.topics[]] | join(",")' <<<"$data")

  desc_ok='NO'
  site_ok='NO'
  topics_ok='NO'

  [[ -n "$description" ]] && desc_ok='YES'
  [[ -n "$homepage" ]] && site_ok='YES'
  [[ -n "$topics" ]] && topics_ok='YES'

  printf '%-32s | %-6s | %-7s | %s\n' "$repo" "$desc_ok" "$site_ok" "$topics_ok"
done

echo
echo 'Organization:'
gh api "orgs/${ORG}" --jq '{login,description,blog}'
