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

  local topics_json
  topics_json=$(printf '%s\n' "$@" | python3 -c 'import json,sys; print(json.dumps({"names":[x.strip() for x in sys.stdin if x.strip()]}))')
  gh api --method PUT \
    -H 'Accept: application/vnd.github+json' \
    "repos/${ORG}/${repo}/topics" \
    --input - <<<"${topics_json}" >/dev/null
}

set_repo 'aetumi-mcp' \
  'AETumi MCP — a Model Context Protocol server for Claude Code, Cursor and other MCP-capable coding assistants to discover and integrate production-ready Three.js and WebGL assets into projects.' \
  'https://aetumi.app/mcp/' \
  aetumi mcp model-context-protocol claude-code cursor threejs webgl 3d-web ai-coding react-three-fiber nextjs

set_repo 'aetumi-3d-web-examples' \
  'Production-ready 3D website examples built with Three.js, WebGL and Next.js — cinematic, interactive and designed as practical AETumi implementation references.' \
  'https://aetumi.app/3d-websites/' \
  aetumi 3d-website threejs webgl nextjs react 3d-web interactive-web web-design

set_repo 'aetumi-3d-components' \
  'Reusable 3D web components — hero sections, product viewers, carousels, shaders and scroll scenes for Three.js, WebGL and React Three Fiber projects.' \
  'https://aetumi.app/3d-components/' \
  aetumi 3d-components threejs react-three-fiber webgl react ui-components 3d-web

set_repo 'interactive-3d-web-examples' \
  'Interactive 3D web experiences — scroll-driven scenes, WebGL interaction, motion and immersive browser patterns built with Three.js and React.' \
  'https://aetumi.app/interactive-websites/' \
  aetumi interactive-3d threejs webgl scrollytelling animation 3d-web react

set_repo 'aetumi-agency-starter' \
  'Agency-grade 3D website workflow for studios shipping cinematic client sites with Next.js, Three.js, WebGL, production QA and structured handoff.' \
  'https://aetumi.app/for-agencies/' \
  aetumi nextjs threejs agency starter 3d-web webgl client-work

set_repo 'threejs-product-viewer' \
  'Three.js product viewer patterns for 3D configurators, hotspots, material variants, exploded views and mobile ecommerce interaction.' \
  'https://aetumi.app/3d-components/' \
  aetumi threejs product-viewer 3d-configurator ecommerce webgl react-three-fiber 3d-model

set_repo 'threejs-scroll-animation' \
  'Three.js scroll animation — pin, scrub, camera, reveal and scrollytelling patterns for cinematic production-ready 3D websites.' \
  'https://aetumi.app/3d-scroll/' \
  aetumi threejs scroll-animation scrollytelling gsap webgl 3d-web animation

set_repo 'webgl-react-components' \
  'WebGL React components — GPU-accelerated shader backgrounds, visual effects and interactive canvas patterns for React and Next.js.' \
  'https://aetumi.app/webgl/' \
  aetumi webgl react shaders glsl components 3d-web background

set_repo 'webgl-shader-examples' \
  'WebGL GLSL shader examples — fragment shaders, animated backgrounds, distortion and interactive effects with performance and mobile fallbacks.' \
  'https://aetumi.app/webgl/' \
  aetumi webgl glsl shaders fragment-shader graphics 3d-web performance

set_repo 'react-three-fiber-examples' \
  'React Three Fiber examples — declarative Three.js patterns for React and Next.js with editable implementation examples and production guidance.' \
  'https://aetumi.app/react-three-fiber/' \
  aetumi react-three-fiber threejs react nextjs 3d-web webgl drei

set_repo 'nextjs-threejs-starter' \
  'Next.js + Three.js starter architecture — server-rendered semantic HTML with client-side 3D, SEO, accessibility and performance-aware loading.' \
  'https://aetumi.app/docs/' \
  aetumi nextjs threejs react-three-fiber starter ssr seo 3d-web

set_repo 'claude-code-threejs' \
  'Claude Code + Three.js — architecture-first workflows, technical briefs and production checklists for building interactive 3D web experiences with AI.' \
  'https://aetumi.app/news/claude-code-threejs/' \
  aetumi claude-code threejs ai-coding mcp 3d-web workflow react-three-fiber

set_repo 'ai-coding-3d-web' \
  'AI coding for the 3D web — shared workflows across Claude Code, Cursor, Codex and MCP for building Three.js, WebGL, Next.js and React sites.' \
  'https://aetumi.app/mcp/' \
  aetumi ai-coding claude-code cursor codex mcp threejs webgl 3d-web

set_repo '3d-web-ai-prompts' \
  'AI prompts for 3D web design — reusable technical briefs for Three.js, WebGL, React Three Fiber components and cinematic interactive websites.' \
  'https://aetumi.app/3d-prompts/' \
  aetumi ai-prompts prompt-engineering threejs 3d-web webgl web-design generative-ai

echo 'AETumi GitHub metadata configured.'
