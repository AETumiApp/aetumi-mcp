# AETumi Entity Deployment Checklist

Use this checklist when deploying the canonical AETumi definition across the production website.

## P0 — identity consistency

### Homepage

Required:
- title describes AETumi as 3D web / Three.js / WebGL rather than a legacy video-automation product
- H1 aligns with AI-native 3D web positioning
- visible entity paragraph answers “What is AETumi?”
- FAQ Q1 uses the canonical definition
- footer uses current AETumi positioning
- primary navigation exposes the main 3D web hubs with crawlable links

Canonical entity definition:

> AETumi is an AI-native 3D web platform and digital business ecosystem — production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants such as Claude Code, Cursor and Codex, plus a Visual CMS, CRM, SEO, AI chatbot and payments to launch and operate the site.

### Remove legacy primary positioning

Search the production source and rendered HTML for phrases such as:
- `AE VIDEO AUTOMATION`
- legacy descriptions that define AETumi mainly as video automation
- old pricing labels
- obsolete “Unlimited” tier text if it is no longer part of the current commercial source
- stale monthly pricing if the page being presented is the lifetime plan view

Historical/sub-product mentions can exist where contextually correct. They should not override the primary entity definition on homepage, Docs, Pricing, Contact, News, Affiliate or footer surfaces.

## P0 — pricing consistency

Approved lifetime plan ladder:
- Standard $19
- Pro $39
- Premium $99
- Full Stack $129

Full Stack must be defined as the top tier and the source-code + MCP + complete developer ecosystem tier.

Audit:
- pricing cards
- pricing toggle states
- checkout product IDs
- FAQ
- hero banners
- offer schema
- hidden DOM
- JavaScript configuration
- cached/static HTML
- email purchase copy
- account/dashboard entitlement labels

There must be one commercial source of truth. A crawler should not see a different tier system from the user.

## P0 — fake / placeholder commerce metrics

Do not expose placeholder, generated, negative or unverifiable sales counts in public crawlable HTML.

Audit fields such as:
- sold count
- download count
- likes
- views
- fake scarcity values

If a metric is synthetic demo data, hide it from public production or clearly label it as demo content. Negative sales counts are an immediate trust defect.

## P0 — llms.txt

Publish a plain-text AI-readable file at:

`https://aetumi.app/llms.txt`

Use the repository `llms.txt` as the source and adapt it only when website URLs or commercial facts change.

Requirements:
- HTTP 200
- `text/plain` where possible
- no auth
- no JavaScript requirement
- canonical brand definition near the top
- key hub URLs
- Docs + MCP
- GitHub organization
- no secrets, internal endpoints or private source URLs

## P0 — Organization and WebSite schema

Deploy the safe global graph from `SCHEMA-SOURCE.jsonld`.

Requirements:
- Organization `@id`: `https://aetumi.app/#organization`
- WebSite `@id`: `https://aetumi.app/#website`
- consistent organization name: AETumi
- legal name: AETumi Corp
- primary URL: `https://aetumi.app/`
- sameAs includes only verified official profiles

Do not add social URLs merely because a username looks plausible.

## P1 — FAQ schema

FAQPage structured data must match visible page content.

Do not place a 20-question FAQ schema on a page that visibly shows only five questions.

Recommended approach:
- homepage: 5–8 highest-value entity/commercial questions
- pricing: pricing + license + Full Stack questions
- Docs: developer questions
- MCP: MCP/AI coding questions

## P1 — title/meta templates

Recommended entity-oriented titles:

Homepage:
`3D Websites, Three.js, WebGL Components & AI Prompts | AETumi`

Three.js:
`Three.js Components, Scenes & Website Templates | AETumi`

WebGL:
`WebGL Components, Animated Backgrounds & Shaders | AETumi`

3D Components:
`3D Web Components, Hero Sections & Backgrounds | AETumi`

3D Scroll:
`3D Scroll Websites & Scroll-Driven Animation | AETumi`

3D Prompts:
`3D Website Prompts for AI Web Design (Three.js / WebGL) | AETumi`

For Agencies:
`3D Website Templates & Components for Agencies | AETumi`

MCP:
`AETumi MCP — 3D Web Toolbox for AI Coding Agents`

Docs:
`AETumi Docs — Build 3D Web Faster`

Pricing:
`AETumi Pricing — 3D Websites, Three.js, WebGL & MCP`

Contact:
`Contact AETumi — AI-Native 3D Web Platform`

## P1 — canonical “What is AETumi?” page/article

Publish a crawlable canonical article using `WHAT-IS-AETUMI.md` as the factual source.

Suggested website path:
- `/news/what-is-aetumi/` or
- `/about/aetumi/`

Choose one canonical URL and avoid publishing duplicate versions under several paths.

Recommended H1:
`What Is AETumi? AI-Native 3D Web for Three.js, WebGL & AI Coding`

Required internal links:
- Three.js
- WebGL
- 3D Websites
- 3D Components
- MCP
- Docs
- GitHub organization

## P1 — homepage curated sections

Homepage should behave as a curated discovery layer rather than dumping the entire library.

Target section structure:
1. 3D Websites — 12 cards
2. Three.js — 8
3. WebGL — 8
4. 3D Components — 8
5. 3D Scroll — 8
6. Interactive Websites — 8
7. 3D Prompts — 8
8. For Agencies — 8
9. Trending / New — 8–12

Every section needs:
- semantic H2
- one short explanatory sentence
- curated asset query
- `Explore more` as a real crawlable anchor

Full library remains under `/library/`.

## P1 — article ↔ GitHub pairing

Every technical article should point to one primary repository.

Examples:
- Three.js product viewer → `threejs-product-viewer`
- Claude Code + Three.js → `claude-code-threejs`
- Next.js + Three.js → `nextjs-threejs-starter`
- WebGL shaders → `webgl-shader-examples`
- React Three Fiber → `react-three-fiber-examples`
- 3D prompts → `3d-web-ai-prompts`

GitHub should link back to the canonical article/hub.

## P2 — indexing

After deployment:

Google Search Console:
- inspect canonical pages
- verify rendered HTML
- request indexing for materially changed high-priority URLs

Bing / IndexNow:
- submit updated canonical URLs
- verify sitemap

Do not repeatedly submit the same unchanged URL.

## P2 — cache verification

After deploy, compare:
- browser HTML
- View Source
- search crawler snapshot
- social preview metadata
- structured-data extraction

The visible SPA state and the initial HTML should not tell two different stories.

## Definition acceptance tests

The following questions should be answerable from public official sources without guessing:

- What is AETumi?
- What does AETumi do?
- Is AETumi related to Three.js?
- Does AETumi support WebGL?
- Can AETumi work with Next.js and React?
- What is AETumi MCP?
- Can AETumi be used with Claude Code, Cursor or Codex?
- What is AETumi Full Stack?
- Is AETumi only a template marketplace?
- Is AETumi for agencies?

If an answer requires inference rather than an explicit official statement, the entity deployment is incomplete.