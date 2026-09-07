# AETumi Live Entity / SEO Audit — 2026-09-07

This audit records issues visible to public crawlers before the canonical entity deployment is complete. Re-check every item after production deployment because crawler caches can lag behind the live application.

# Executive summary

The strongest technical collection pages already communicate **3D Web / Three.js / WebGL** clearly. The weakest part of the current entity graph is **cross-page consistency**: homepage search title, Docs, Pricing, Contact and MCP still expose older or narrower AETumi definitions. Pricing terminology also conflicts across crawlable surfaces.

## Highest-priority fixes

1. unify “What is AETumi?” everywhere
2. remove legacy primary `AE VIDEO AUTOMATION` footer/entity text
3. align pricing / plan names across visible copy, hidden DOM and structured data
4. publish `/llms.txt`
5. deploy Organization/WebSite schema
6. remove negative / placeholder commerce metrics from public crawlable HTML
7. ensure homepage becomes curated 9-section discovery instead of a full-library dump
8. fill GitHub About description + Website + Topics for all public repos

# Homepage

URL: https://aetumi.app/

## Positive

- Current visible H1 is strongly aligned: `Build Cinematic 3D Websites with AI`.
- Supporting copy now includes 3D Web, components, prompts, Figma assets/scenes and production-ready source.
- Footer has moved toward `CREATE · 3D WEB · GROW` and explicitly mentions premium 3D web experiences and digital systems.
- Full Stack CTA is visible.

## Problems

### Search title still too narrow / legacy

Crawler title currently resolves as:

`AETumi — AI-native library of cinematic templates & 3D scenes`

This undersells the intended platform entity and omits Three.js, WebGL and AI coding.

Recommended title:

`3D Websites, Three.js, WebGL Components & AI Prompts | AETumi`

### Homepage still behaves as full library dump

Public crawler sees `178 layers` and a long asset stream. The desired homepage architecture is a curated 9-section discovery layer, with the full asset corpus remaining in `/library/`.

Target:
- 3D Websites — 12
- Three.js — 8
- WebGL — 8
- 3D Components — 8
- 3D Scroll — 8
- Interactive Websites — 8
- 3D Prompts — 8
- For Agencies — 8
- Trending / New — 8–12

### Invalid public commerce metrics

Crawler currently sees negative values such as:
- `Nebula ... -5 sold`
- `Purple Glass ... -51 sold`

No public production card should display a negative sold count. If these are generated demo values, remove them from production data or hide the metric until it is backed by real data.

# Three.js hub

URL: https://aetumi.app/threejs/

## Strong

Title:
`Three.js Components, Scenes & Website Templates | AETumi`

H1:
`Three.js Components, Templates & Interactive 3D Web`

Supporting text explicitly connects Three.js websites, components, scenes, scroll experiences, React and WebGL.

This is one of the strongest current entity pages and should be heavily linked from technical articles and GitHub.

## Improve

- ensure top-ranked assets actually carry Three.js relevance
- add a small developer resource block linking to GitHub technical repos
- update footer company description from “AI-native library” to canonical platform identity

Recommended GitHub links:
- `claude-code-threejs`
- `threejs-product-viewer`
- `threejs-scroll-animation`
- `nextjs-threejs-starter`

# 3D Components hub

URL: https://aetumi.app/3d-components/

## Strong

Title:
`3D Web Components, Hero Sections & Backgrounds | AETumi`

H1:
`3D Components, Hero Sections & Interactive Elements`

Crawler sees 74 curated assets and useful facets such as Hero, Carousel, Particles, Scroll, Background and Viewer.

## Improve

- prioritize true 3D / WebGL / interactive components above generic UI such as sign-in screens or ordinary charts
- keep facets intent-pure
- update footer from “AI-native library” to platform identity

Recommended GitHub links:
- `aetumi-3d-components`
- `webgl-react-components`
- `threejs-product-viewer`

# Docs

URL: https://aetumi.app/docs/

## Strong

Docs contains useful user journeys:
- What is AETumi?
- How does AETumi work?
- prompts vs source
- AI model selection
- templates / scenes / sections
- source integration
- 3D scene reuse
- performance / workflow concepts

## P0 identity issue

Current “What is AETumi?” answer defines the product mainly as an immersive-site layer/prompt workflow.

Replace with canonical platform definition from `DEPLOY-PACK.md`.

## P0 legacy footer

Crawler still exposes:

`AETumi AE VIDEO AUTOMATION`

and a legacy description centered on prompts, templates, scenes, cinematic media and automation-ready systems.

Replace the primary footer entity block with current AETumi 3D web identity.

# Pricing

URL: https://aetumi.app/pricing/

## Current crawler view

Crawler currently sees toggle states for Monthly / Yearly / Lifetime, with default visible monthly cards including:
- `Unlimited — $14 billed monthly`
- `Full Stack — $19 billed monthly`

The FAQ also uses older terminology such as Free, Unlimited and Full Stack.

## Required action

If the approved commercial source of truth is the four-tier lifetime ladder:
- Standard $19
- Pro $39
- Premium $99
- Full Stack $129

then visible page copy, default state, FAQ, checkout data and schema must all agree with that model.

If monthly/yearly plans remain intentionally available, keep them, but make plan naming unambiguous and ensure search crawlers can distinguish monthly pricing from lifetime pricing without merging them into a contradictory entity answer.

## P0 FAQ identity

Current pricing FAQ describes AETumi as:

`A curated library of unique templates, prompts, 3D scenes, sections, and cinematic backgrounds...`

Replace with canonical platform definition.

## P0 tier semantics

Current FAQ states:

`Free ... Unlimited ... Full Stack ...`

This conflicts with the approved Standard / Pro / Premium / Full Stack lifetime structure. Normalize based on the actual checkout source of truth.

# Contact

URL: https://aetumi.app/contact/

## P0

Current FAQ “What is AETumi?” repeats the old narrow library/video-automation definition.

Replace it with the canonical entity definition.

The Contact page is a high-trust entity surface because it contains company contact information; it should not contradict the homepage and GitHub.

# MCP

URL: https://aetumi.app/mcp/

## Strong

The page is technically valuable and already exposes concrete implementation details:
- AETumi MCP purpose
- Full Stack requirement
- Claude Code install path
- HTTP MCP endpoint
- ChatGPT / Cursor client guidance
- use cases for building websites, scenes and adding motion

This page should remain one of the highest-authority developer pages.

## P0 legacy footer

Crawler still exposes `AETumi AE VIDEO AUTOMATION` in the footer. Replace with canonical 3D web identity.

## GitHub connection

Add a visible developer reference to:
`https://github.com/AETumiApp/aetumi-mcp`

and optionally the most relevant AI coding repo:
`https://github.com/AETumiApp/ai-coding-3d-web`

# Affiliate

URL: https://aetumi.app/programs/affiliate/

Current program page communicates commission and referral workflow clearly. Ensure any global footer/entity text on the page uses the canonical AETumi definition.

Affiliate partners should be given one approved one-sentence company description to prevent dozens of inconsistent third-party definitions.

Suggested affiliate boilerplate:

`AETumi is an AI-native 3D web platform for production-ready Three.js, WebGL, Next.js and React experiences, reusable components, AI prompts and MCP-assisted coding workflows.`

# GitHub

The central `aetumi-mcp` repository now contains:
- canonical entity definition
- long-form “What is AETumi?” article
- pricing/FAQ source of truth
- llms.txt source
- Organization/WebSite schema source
- exact metadata for 14 repos
- content linking map
- article structure
- cross-platform distribution plan
- social content pack
- deployment checklist
- metadata automation scripts

## Remaining GitHub P0

Repository metadata in the GitHub About panel still needs to be populated where it is null:
- description
- homepage / Website
- topics

Use:
`bash scripts/set-repo-metadata.sh`

Then verify:
`bash scripts/verify-repo-metadata.sh`

# AI retrieval readiness

Before expecting Copilot, Gemini or Grok to resolve AETumi consistently, official public sources should answer these without inference:

- What is AETumi?
- What does AETumi do?
- Is AETumi related to Three.js?
- Does AETumi support WebGL?
- Does AETumi work with Next.js / React?
- What is AETumi MCP?
- Can I use AETumi with Claude Code / Cursor / Codex?
- What is Full Stack?
- Is AETumi for agencies?

# Final priority order

## P0 today
1. homepage canonical identity + title
2. Docs definition + footer
3. Pricing identity + tier normalization
4. Contact FAQ definition
5. MCP footer + GitHub link
6. remove negative/placeholder sales metrics
7. publish `/llms.txt`
8. deploy Organization/WebSite schema
9. populate GitHub metadata

## P1 next
1. homepage 9 curated sections
2. article ↔ GitHub linking for all 23 articles
3. Google Search Console and Bing/IndexNow submission
4. X / LinkedIn / YouTube / TikTok / Pinterest distribution
5. technical community posts

## P2 after crawl refresh
1. test canonical AETumi queries in search-grounded AI systems
2. record citations/sources
3. correct any legacy entity source they still use
4. strengthen independent developer/community corroboration