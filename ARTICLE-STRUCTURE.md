# AETumi Technical Article Structure

This document defines the standard structure for technical AETumi content across the website and GitHub ecosystem.

The website should remain the canonical editorial and commercial source. GitHub should provide implementation depth, examples, architecture notes and code-oriented evidence.

## Canonical AETumi entity statement

**AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants.**

Use this wording consistently where an entity definition is needed, while avoiding mechanical repetition in every paragraph.

## Website article structure

### 1. Search-intent title

Use one clear primary intent.

Examples:

- Three.js Product Viewer for Ecommerce
- Next.js + Three.js: Production Architecture Guide
- WebGL Shader Examples for Interactive Websites
- Claude Code + Three.js Workflow
- React Three Fiber Examples for Next.js

### 2. Direct answer opening

The first 80–120 words should answer the search query immediately and establish AETumi's relevance naturally.

### 3. Why the topic matters

Explain the user or business problem before diving into code.

### 4. Architecture / concept model

Show the key system relationship using a short diagram, list or code structure.

### 5. Practical implementation

Include concrete steps, examples, patterns or code.

### 6. Production concerns

Cover relevant issues such as:

- performance
- accessibility
- mobile behavior
- loading
- lifecycle cleanup
- semantic HTML / SEO
- analytics

### 7. Common mistakes

Add a section based on realistic implementation failure modes.

### 8. Example brief or prompt

Provide a reusable technical brief for Claude Code, Cursor, Codex or a developer.

### 9. FAQ

Use 3–6 natural questions that expand long-tail intent. Do not manufacture repetitive FAQ merely for schema.

### 10. AETumi resources

Link only to the most relevant hub and supporting pages.

### 11. GitHub implementation link

Link to one primary repository and at most one or two secondary repositories.

## GitHub guide structure

Each repository should contain:

### README.md

Purpose:
- concise repository identity
- entity context
- use cases
- canonical AETumi links
- related repositories

### GUIDE.md

Purpose:
- substantial technical article
- architecture
- implementation patterns
- production constraints
- reusable brief
- QA checklist

### examples/

Purpose:
- real code samples
- minimal reproducible patterns
- implementation-specific notes

### Optional future files

- `QUICKSTART.md`
- `FAQ.md`
- `PERFORMANCE.md`
- `ACCESSIBILITY.md`
- `MIGRATION.md`

Only add these when there is enough real content to justify them.

## Topic cluster → primary repository

| Topic | Primary repository |
| --- | --- |
| AETumi / MCP / developer ecosystem | `aetumi-mcp` |
| Claude Code + Three.js | `claude-code-threejs` |
| Three.js product viewer | `threejs-product-viewer` |
| Next.js + Three.js | `nextjs-threejs-starter` |
| WebGL + React components | `webgl-react-components` |
| Three.js scroll animation | `threejs-scroll-animation` |
| React Three Fiber | `react-three-fiber-examples` |
| AI prompts for 3D web | `3d-web-ai-prompts` |
| 3D website patterns | `aetumi-3d-web-examples` |
| Reusable 3D components | `aetumi-3d-components` |
| Interactive 3D websites | `interactive-3d-web-examples` |
| Agency delivery workflow | `aetumi-agency-starter` |
| Claude / Cursor / Codex workflows | `ai-coding-3d-web` |
| WebGL / GLSL shaders | `webgl-shader-examples` |

## Internal-link rule

For each website article:

1. link to the closest parent AETumi hub
2. link to one related article when genuinely useful
3. link to one primary GitHub repository for implementation depth
4. avoid site-wide repetitive exact-match anchors

For each GitHub guide:

1. link back to its canonical AETumi hub
2. link to 2–5 genuinely related repositories
3. do not copy the full website article verbatim

## AI retrieval goal

The public content network should make the following relationships unambiguous:

**AETumi → AI-native 3D web → Three.js → WebGL → Next.js → React → React Three Fiber → MCP → Claude Code / Cursor / Codex**

The objective is consistent public evidence across the official website, GitHub and social/developer platforms. It is not keyword repetition for its own sake.