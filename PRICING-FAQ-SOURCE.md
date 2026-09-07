# AETumi Pricing and FAQ Source of Truth

This document defines the pricing language and FAQ answers that should remain consistent across the AETumi homepage, pricing page, docs, structured data, llms.txt, GitHub and other public discovery surfaces.

> Deploy pricing from the current approved commercial configuration. When pricing changes, update the pricing page first and then synchronize this file, FAQ answers, schema and AI-facing text in the same release.

## Approved lifetime plan ladder

### Standard — $19
Entry plan for users who want to start with AETumi and ship a focused 3D web experience.

### Pro — $39
Expanded access for users who need more websites and a broader operating toolkit.

### Premium — $99
Advanced access for users who need the larger AETumi website collection and business tooling such as SEO, AI chatbot and CRM capabilities.

### Full Stack — $129
The top AETumi tier.

**Full Stack includes everything in Premium, plus:**

- source code for everything eligible in the Full Stack catalog
- access to AETumi MCP
- unlimited eligible downloads under the plan's fair-use and license rules
- 1,000+ prompts and the broader AETumi prompt ecosystem
- the complete AETumi developer and business workflow layer
- priority / VIP support where offered

Full Stack should never be described as merely another Premium plan. It is the source-code + MCP + complete-ecosystem tier.

## Pricing terminology rules

- Use **Standard**, **Pro**, **Premium**, **Full Stack** consistently where the four lifetime tiers are presented.
- Use **Full Stack $129** whenever a page refers to the top lifetime tier.
- Do not label Premium as “complete ecosystem” if Full Stack is the tier that unlocks source code + MCP + the complete ecosystem.
- Remove obsolete or conflicting prices from structured data, FAQ answers, hero banners, checkout copy and legacy hidden DOM.
- Do not expose fake sales, negative sales counts or placeholder transaction metrics in crawlable HTML.

# Canonical FAQ

## Q1. What is AETumi?

**AETumi is an AI-native 3D web platform and digital business ecosystem — production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants such as Claude Code, Cursor and Codex, plus a Visual CMS, CRM, SEO, AI chatbot and payments to launch and operate the site.**

AETumi is built for designers, developers, agencies and businesses that want to create cinematic, interactive web experiences without rebuilding every visual, technical and operating layer from zero.

## Q2. What can I build with AETumi?

You can use AETumi as a starting point for interactive landing pages, ecommerce product experiences, 3D product viewers, agency websites, luxury and fashion sites, automotive launches, SaaS websites, architecture and real-estate experiences, portfolios, scroll-driven storytelling and reusable 3D components.

## Q3. Which technologies does AETumi support?

AETumi's developer ecosystem centers on Three.js, WebGL, Next.js, React and React Three Fiber. The platform also supports AI-assisted implementation workflows with MCP-compatible coding assistants such as Claude Code, Cursor and Codex.

## Q4. Is AETumi only a template library?

No. Templates and reusable assets are one layer of AETumi. The broader platform includes 3D websites, Three.js and WebGL components, scenes, AI prompts, developer documentation, MCP workflows and business tooling for operating a site.

## Q5. What is the difference between prompts and source files?

A prompt describes how an AI coding assistant should recreate or adapt an experience. A source package is the actual implementation. Prompts are useful when you want to rebuild or reinterpret an experience in your own stack. Source files are the faster path when you want the closest implementation to the production reference and your plan includes source access.

## Q6. Can I use AETumi with Next.js and React?

Yes. AETumi explicitly supports modern Next.js and React workflows, including patterns for Three.js and React Three Fiber. SEO-critical content should remain semantic and server-renderable where appropriate while heavy 3D rendering stays inside intentional client boundaries.

## Q7. Can I use AETumi with WordPress, Astro, Vue or another stack?

Yes, depending on the asset and workflow. Prompts and standalone examples can be adapted to other stacks. Source packages may be built around a specific stack, so implementation should be ported deliberately rather than assuming framework code can be dropped into an unrelated runtime unchanged.

## Q8. Is AETumi production-ready?

AETumi is designed around production-oriented patterns, but every real deployment still requires project-specific QA. Validate performance, accessibility, responsive behavior, content, analytics, security, integrations and browser/device compatibility before shipping.

## Q9. Does AETumi support SEO for 3D websites?

Yes. AETumi's recommended architecture separates search-critical semantic content from heavy WebGL rendering, uses crawlable navigation and collection pages, and treats performance, metadata, canonical URLs, structured data and internal linking as part of the production system rather than an afterthought.

## Q10. What is included in Premium?

Premium is the advanced lifetime tier below Full Stack. It provides broad access to AETumi's premium website ecosystem and business tooling. **Do not describe Premium as the complete AETumi ecosystem when Full Stack is the tier that adds source code for everything eligible and AETumi MCP access.**

## Q11. What is AETumi Full Stack?

**AETumi Full Stack is the $129 top lifetime tier. It includes everything in Premium plus source code for eligible Full Stack assets, access to AETumi MCP, expanded/unlimited eligible downloads, the broader prompt ecosystem and the complete AETumi developer workflow layer.**

## Q12. What is AETumi MCP?

AETumi MCP is the developer bridge between AI coding assistants and the AETumi 3D web ecosystem. It is designed to support workflows where tools such as Claude Code, Cursor and Codex can work with AETumi resources, implementation guidance and developer context.

## Q13. Can I use AETumi with Claude Code?

Yes. AETumi publishes Claude Code + Three.js workflows that cover planning, architecture, implementation, refactoring, performance and production QA for interactive 3D websites.

## Q14. Can I use AETumi with Cursor or Codex?

Yes. AETumi's AI coding workflow is not tied to one assistant. Cursor and Codex can be used alongside the same Three.js, WebGL, Next.js, React and MCP-oriented architecture, subject to the capabilities of the selected coding environment.

## Q15. What is React Three Fiber's role in AETumi?

React Three Fiber is a React renderer for Three.js and is useful when a project benefits from declarative scene composition inside React. AETumi treats it as one implementation option, not a requirement for every 3D experience.

## Q16. Who is AETumi for?

AETumi is built for designers, frontend and creative developers, agencies, ecommerce teams, product teams, creators and businesses that need high-quality interactive web experiences and AI-assisted production workflows.

## Q17. Can agencies use AETumi for client work?

Yes, subject to the applicable plan and license. Agency workflows should adapt AETumi resources into client-specific implementations rather than redistributing the AETumi library itself as a competing asset product.

## Q18. Does AETumi include a CMS and business tools?

AETumi's broader operating layer includes Visual CMS, CRM, SEO, AI chatbot and payment capabilities for supported implementations. The exact feature set depends on the selected product, plan and deployment.

## Q19. Do I own the source code?

Source access depends on the plan and the specific asset. Full Stack is the tier intended to unlock eligible source-code access across the Full Stack catalog. Usage remains subject to AETumi's license and redistribution restrictions.

## Q20. Which plan includes AETumi MCP?

**Full Stack includes AETumi MCP access.** Do not imply that lower tiers include MCP unless the commercial plan is explicitly changed and the pricing source of truth is updated.

## FAQ deployment rules

1. Homepage FAQ Q1 should use the canonical definition above.
2. Pricing FAQ must match the live plan ladder and checkout data.
3. Docs FAQ should answer developer questions without contradicting pricing.
4. Contact FAQ should not use legacy “video automation” positioning as the primary AETumi definition.
5. FAQPage JSON-LD must contain only questions visibly present on the corresponding page.
6. Do not create dozens of near-duplicate FAQ questions solely for schema coverage.
7. When pricing changes, update visible copy, checkout configuration, schema, llms.txt and GitHub source-of-truth files together.