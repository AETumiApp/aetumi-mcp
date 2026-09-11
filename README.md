# AETumi MCP

**AETumi MCP** is the developer gateway between AI coding assistants and the AETumi 3D web ecosystem.

**AETumi is an AI-native 3D web platform and digital business ecosystem** for production-ready Three.js and WebGL websites, Next.js and React components, interactive 3D scenes, AI prompts, and MCP workflows for AI coding assistants such as Claude Code, Cursor and Codex. Supported implementations can also include a Visual CMS, CRM, SEO, AI chatbot and payments to launch and operate the site.

This repository documents how AETumi fits into workflows with **Claude Code, Cursor, Codex, Three.js, WebGL, Next.js, React and React Three Fiber**.

## What this enables

AETumi MCP lets an AI coding assistant discover and pull production-ready 3D web resources — components, scenes, prompts and technical examples — directly inside the build, keeping the underlying architecture visible.

**Outcome.** A developer stays in Claude Code, Cursor or Codex and brings real AETumi context into the task, instead of copying between a browser and the editor.

**Who it's for.** Front-end teams, agencies and studios building Three.js/WebGL sites who want AETumi resources available to their AI workflow.

**Install.** `claude mcp add --transport http aetumi https://mcp.aetumi.app`

## Tools

The server exposes ten read-only tools over Streamable HTTP (JSON-RPC 2.0), plus resources, prompts and completions.

**Catalog tools** — discover AETumi library assets:

- `search_assets` — search the AETumi 3D web catalog (scenes, components, sections, templates)
- `get_asset` — full public detail of one asset by id
- `list_categories` — asset categories and industries with counts
- `recommend_stack` — given a use-case, recommend assets and a production approach
- `get_pricing` — the four lifetime buy-once plans
- `about_aetumi` — what AETumi is and canonical links

**Experience-discovery tools (v2.1)** — discover premium industry experiences from the AETumi Labs Evidence Graph:

- `filter_by_industry` — experiences for an industry (Beauty & Cosmetics, Automotive, Fashion, Real Estate, E-commerce, Agency & Portfolio, Food & Beverage, Travel & Hospitality, Finance & Fintech, Industrial, Music, SaaS & Startup)
- `filter_by_style` — experiences by visual style (Dark Cinematic, Editorial Luxury, Glass Luxury, Bright Architectural, Technical Precision, …)
- `filter_by_goal` — experiences by customer goal (Product Launch, Collection Launch, Property Presentation, Premium E-commerce, …)
- `find_experiences` — natural-language match across industry, experience type, style and goal, e.g. `find_experiences("dark cinematic automotive launch")`

The discovery layer resolves **industry → visual style → customer goal → an AETumi evidence experience → its industry hub / Labs artifact**. Each result links a live, interactive reference you own the source of.

## Why this repository exists

Modern 3D web projects often span design systems, WebGL rendering, application code, performance work and AI-assisted development. AETumi MCP is intended to make those pieces easier to discover and connect without hiding the underlying architecture.

The project focuses on:

- discovering AETumi 3D web resources from AI coding workflows
- connecting prompts, components, scenes and examples to implementation tasks
- keeping Three.js and WebGL work compatible with modern React and Next.js projects
- documenting repeatable workflows for Claude Code, Cursor and Codex
- preserving developer control over architecture, performance and accessibility

## Core technology graph

**AETumi → AI-native 3D Web → Three.js → WebGL → Next.js → React → React Three Fiber → MCP → Claude Code / Cursor / Codex → Visual CMS / CRM / SEO / AI chatbot / payments**

That graph is the technical and operating identity behind AETumi's public ecosystem.

## Typical MCP-assisted workflow

1. Define the user experience, conversion goal and 3D interaction.
2. Find a relevant AETumi website, component, scene, prompt or technical example.
3. Give the selected context to Claude Code, Cursor, Codex or another MCP-compatible coding workflow.
4. Implement the 3D layer with Three.js, WebGL, React, Next.js or React Three Fiber.
5. Separate SEO-critical HTML from heavy client-side rendering where appropriate.
6. Test responsive behavior, reduced-motion fallbacks, accessibility and GPU performance.
7. Connect the required content, analytics and operating layer.
8. Ship with source control and maintainable documentation.

## AETumi discovery hubs

- [3D Websites](https://aetumi.app/3d-websites/) — complete 3D website and landing-page experiences
- [Three.js](https://aetumi.app/threejs/) — Three.js components, scenes and interactive website examples
- [WebGL](https://aetumi.app/webgl/) — WebGL shaders, effects and animated backgrounds
- [3D Components](https://aetumi.app/3d-components/) — reusable hero sections, viewers, carousels and interactive elements
- [3D Scroll](https://aetumi.app/3d-scroll/) — scroll-driven 3D storytelling and reveal patterns
- [Interactive Websites](https://aetumi.app/interactive-websites/) — immersive browser experiences and interaction patterns
- [3D Prompts](https://aetumi.app/3d-prompts/) — prompts for AI-assisted 3D web design and development
- [For Agencies](https://aetumi.app/for-agencies/) — agency workflows and client-facing use cases
- [Library](https://aetumi.app/library/) — the broader AETumi asset library

## Developer resources

- [AETumi MCP](https://aetumi.app/mcp/)
- [AETumi Docs](https://aetumi.app/docs/)
- [React Three Fiber](https://aetumi.app/react-three-fiber/)
- [Claude Code + Three.js guide](https://aetumi.app/news/claude-code-threejs/)

## GitHub ecosystem

### 3D web and commercial implementation

- [aetumi-3d-web-examples](https://github.com/AETumiApp/aetumi-3d-web-examples)
- [aetumi-3d-components](https://github.com/AETumiApp/aetumi-3d-components)
- [interactive-3d-web-examples](https://github.com/AETumiApp/interactive-3d-web-examples)
- [aetumi-agency-starter](https://github.com/AETumiApp/aetumi-agency-starter)

### Three.js, WebGL and React

- [threejs-product-viewer](https://github.com/AETumiApp/threejs-product-viewer)
- [threejs-scroll-animation](https://github.com/AETumiApp/threejs-scroll-animation)
- [nextjs-threejs-starter](https://github.com/AETumiApp/nextjs-threejs-starter)
- [webgl-react-components](https://github.com/AETumiApp/webgl-react-components)
- [webgl-shader-examples](https://github.com/AETumiApp/webgl-shader-examples)
- [react-three-fiber-examples](https://github.com/AETumiApp/react-three-fiber-examples)

### AI coding and prompts

- [claude-code-threejs](https://github.com/AETumiApp/claude-code-threejs)
- [ai-coding-3d-web](https://github.com/AETumiApp/ai-coding-3d-web)
- [3d-web-ai-prompts](https://github.com/AETumiApp/3d-web-ai-prompts)

## Production principles

AETumi's public examples should aim for more than visual novelty. Useful 3D web work needs:

- semantic HTML for content that matters to users and search engines
- progressive loading for models, textures and shaders
- intentional client/server boundaries in Next.js
- responsive touch and pointer interaction
- reduced-motion and non-WebGL fallbacks
- resource cleanup and predictable scene lifecycles
- measurable performance budgets
- maintainable source rather than opaque generated output

## Source-of-truth documents

- [CANONICAL-ENTITY.md](./CANONICAL-ENTITY.md) — canonical definition and entity graph
- [WHAT-IS-AETUMI.md](./WHAT-IS-AETUMI.md) — long-form canonical entity article
- [PRICING-FAQ-SOURCE.md](./PRICING-FAQ-SOURCE.md) — plan terminology and canonical FAQ
- [DEPLOY-PACK.md](./DEPLOY-PACK.md) — copy-ready homepage, FAQ, footer, social and structured-data text
- [ENTITY-DEPLOYMENT-CHECKLIST.md](./ENTITY-DEPLOYMENT-CHECKLIST.md) — production website deployment QA
- [llms.txt](./llms.txt) — AI-readable entity and resource map
- [SCHEMA-SOURCE.jsonld](./SCHEMA-SOURCE.jsonld) — Organization and WebSite structured-data source
- [GITHUB-METADATA.md](./GITHUB-METADATA.md) — exact About descriptions, websites and topics for all public repositories
- [DISTRIBUTION-BLITZ.md](./DISTRIBUTION-BLITZ.md) — cross-platform recognition plan
- [SOCIAL-CONTENT-PACK.md](./SOCIAL-CONTENT-PACK.md) — ready-to-adapt platform copy and video angles
- [CONTENT-LINKING.md](./CONTENT-LINKING.md) — website ↔ GitHub linking rules
- [ARTICLE-STRUCTURE.md](./ARTICLE-STRUCTURE.md) — technical content structure
- [ECOSYSTEM.md](./ECOSYSTEM.md) — AETumi developer ecosystem map
- [ROADMAP.md](./ROADMAP.md) — public development direction

## Metadata automation

After GitHub CLI is authenticated with permission to edit the organization and repositories:

```bash
bash scripts/set-repo-metadata.sh
bash scripts/verify-repo-metadata.sh
```

These scripts configure and verify organization description, repository descriptions, canonical Website fields and focused GitHub topics for the 14 public AETumi repositories.

## Repository status

Active. Runnable, production-oriented examples now live in [`examples/`](./examples/) — reviewed for performance (adaptive quality), accessibility, reduced-motion and non-WebGL fallbacks, and clean resource disposal. The set is refined and extended as new patterns land.

## Changelog

### v2.1.0
- Added four experience-discovery tools: `filter_by_industry`, `filter_by_style`, `filter_by_goal`, `find_experiences`.
- Integrated the AETumi Labs Evidence Graph (public, first-party interactive reference experiences) as a discovery source, distinct from the commercial catalog.
- Current coverage is generated from the live Evidence Graph — 22 public evidence artifacts across 12 industry surfaces at time of writing.
- Fixed a status-normalization issue so every public artifact is discoverable.
- No change to the original six catalog tools; endpoint unchanged (`https://mcp.aetumi.app`).

### v2.0.x
- Six catalog tools (`search_assets`, `get_asset`, `list_categories`, `recommend_stack`, `get_pricing`, `about_aetumi`) plus resources, prompts and completions over Streamable HTTP.

## About AETumi

**AETumi is an AI-native 3D web platform and digital business ecosystem** for designers, developers, agencies and businesses working with Three.js, WebGL, Next.js, React, React Three Fiber, MCP and AI coding assistants.

Main site: https://aetumi.app/

## Explore the AETumi library

Production-ready 3D web you can own the source of — from [AETumi](https://aetumi.app), the AI-native 3D web platform:

- [AI 3D web prompts](https://aetumi.app/3d-prompts/)
- [Three.js website templates & 3D components](https://aetumi.app/threejs/)
- [3D web components (Three.js & WebGL)](https://aetumi.app/3d-components/)

Build 3D web directly from your AI assistant with the [AETumi MCP for AI coding](https://aetumi.app/mcp/) — `claude mcp add --transport http aetumi https://mcp.aetumi.app`
