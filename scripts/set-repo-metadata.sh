#!/usr/bin/env bash
set -euo pipefail

ORG="AETumiApp"

command -v gh >/dev/null 2>&1 || {
  echo "GitHub CLI (gh) is required. Install it and run: gh auth login"
  exit 1
}

gh auth status >/dev/null 2>&1 || {
  echo "GitHub CLI is not authenticated. Run: gh auth login"
  exit 1
}

# Organization profile metadata. This call requires permission to update the organization.
gh api --method PATCH "orgs/${ORG}" \
  -f description='AETumi is an AI-native 3D web platform for Three.js, WebGL, Next.js, React, MCP and AI coding workflows with Claude Code, Cursor and Codex.' \
  -f blog='https://aetumi.app/' >/dev/null

set_repo() {
  local repo="$1"
  local description="$2"
  local homepage="$3"
  shift 3

  echo "Configuring ${ORG}/${repo}"

  gh repo edit "${ORG}/${repo}" \
    --description "$description" \
    --homepage "$homepage"

  # Replace/normalize topics using the REST endpoint so this is deterministic.
  local topics_json
  topics_json=$(printf '%s\n' "$@" | python3 -c 'import json,sys; print(json.dumps({"names":[x.strip() for x in sys.stdin if x.strip()]}))')
  gh api --method PUT \
    -H 'Accept: application/vnd.github+json' \
    "repos/${ORG}/${repo}/topics" \
    --input - <<<"${topics_json}" >/dev/null
}

set_repo 'aetumi-mcp' \
  "AETumi MCP connects AI coding assistants to AETumi's Three.js, WebGL, Next.js and React 3D web ecosystem." \
  'https://aetumi.app/mcp/' \
  aetumi mcp threejs webgl nextjs react claude-code cursor codex ai-coding

set_repo 'claude-code-threejs' \
  'Production workflows for building Three.js and WebGL websites with Claude Code, Next.js, React and AETumi.' \
  'https://aetumi.app/news/claude-code-threejs/' \
  aetumi claude-code threejs webgl nextjs react ai-coding 3d-web

set_repo 'threejs-product-viewer' \
  'Production patterns for Three.js product viewers, configurators, hotspots, variants and interactive ecommerce experiences.' \
  'https://aetumi.app/threejs/' \
  aetumi threejs product-viewer ecommerce webgl react nextjs 3d-web

set_repo 'nextjs-threejs-starter' \
  'Production architecture for integrating Three.js and React Three Fiber into Next.js with semantic HTML, performance and accessibility.' \
  'https://aetumi.app/docs/' \
  aetumi nextjs threejs react react-three-fiber webgl 3d-web starter

set_repo 'webgl-react-components' \
  'Reusable WebGL and shader-driven components for React and Next.js with responsive lifecycle, performance and fallback patterns.' \
  'https://aetumi.app/webgl/' \
  aetumi webgl react nextjs threejs shaders 3d-components interactive-web

set_repo 'threejs-scroll-animation' \
  'Scroll-driven Three.js storytelling, camera choreography, product reveals and production-ready 3D scroll patterns.' \
  'https://aetumi.app/3d-scroll/' \
  aetumi threejs scroll-animation scrollytelling webgl nextjs react 3d-web

set_repo 'react-three-fiber-examples' \
  'React Three Fiber architecture, scene state, model loading and production patterns for React, Next.js and Three.js.' \
  'https://aetumi.app/react-three-fiber/' \
  aetumi react-three-fiber threejs react nextjs webgl 3d-web examples

set_repo '3d-web-ai-prompts' \
  'Structured AI prompts for 3D websites, Three.js, WebGL, Next.js, React and AI-assisted development workflows.' \
  'https://aetumi.app/3d-prompts/' \
  aetumi ai-prompts 3d-web threejs webgl nextjs react ai-coding

set_repo 'aetumi-3d-web-examples' \
  'Cross-industry reference patterns for cinematic, interactive and production-ready 3D websites built with modern web technology.' \
  'https://aetumi.app/3d-websites/' \
  aetumi 3d-web threejs webgl interactive-web web-design nextjs examples

set_repo 'aetumi-3d-components' \
  'Reusable 3D web heroes, product interactions, shaders, particles, viewers and interactive components for modern websites.' \
  'https://aetumi.app/3d-components/' \
  aetumi 3d-components threejs webgl react nextjs product-viewer interactive-web

set_repo 'interactive-3d-web-examples' \
  'Interaction patterns for immersive websites, product stories, spatial navigation and browser-based 3D experiences.' \
  'https://aetumi.app/interactive-websites/' \
  aetumi interactive-web 3d-web threejs webgl immersive-web web-design examples

set_repo 'aetumi-agency-starter' \
  'Discovery, architecture, QA and handoff workflows for agencies delivering production-ready interactive 3D websites for clients.' \
  'https://aetumi.app/for-agencies/' \
  aetumi agency 3d-web threejs webgl nextjs client-work web-development

set_repo 'ai-coding-3d-web' \
  'AI coding workflows for Three.js and WebGL with Claude Code, Cursor, Codex, Next.js, React and AETumi MCP.' \
  'https://aetumi.app/mcp/' \
  aetumi ai-coding claude-code cursor codex mcp threejs webgl 3d-web

set_repo 'webgl-shader-examples' \
  'GLSL and WebGL shader patterns for gradients, noise, distortion, reveals, materials and interactive website backgrounds.' \
  'https://aetumi.app/webgl/' \
  aetumi webgl glsl shaders threejs fragment-shader 3d-web interactive-web

echo 'AETumi GitHub metadata configured.'
