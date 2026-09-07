# AETumi Cross-Platform Content Pack

Use this pack to establish one consistent public entity while adapting the format to each platform. Do not copy the exact same post everywhere.

# Core message

AETumi is an AI-native 3D web platform for production-ready Three.js, WebGL, Next.js and React experiences, reusable 3D components, AI prompts and MCP workflows with coding assistants such as Claude Code, Cursor and Codex.

# X / Twitter

## Entity launch post

AETumi is building an AI-native 3D web ecosystem for the next generation of interactive sites.

Three.js · WebGL · Next.js · React · React Three Fiber · MCP

For designers, developers and agencies working with Claude Code, Cursor and Codex.

https://aetumi.app/

## Technical thread outline

**Post 1**
AI can generate a website in minutes. Making it feel intentional, cinematic and production-ready is the harder part.

Here is how we think about AI-native 3D web at AETumi ↓

**Post 2**
The page is not “a canvas with text on top.”

We separate:
- semantic content
- application UI
- 3D rendering
- loading/fallback states
- analytics and operating tools

**Post 3**
Three.js and WebGL handle the immersive layer.
Next.js and React handle the application layer.
React Three Fiber is useful when declarative scene composition fits the project.

**Post 4**
AI coding assistants help with planning, implementation and refactoring, but the prompt needs real constraints:

business goal → scene → camera → interaction → responsive behavior → performance → accessibility → output

**Post 5**
That is also why we are building public technical repos around AETumi MCP, Three.js viewers, WebGL components, R3F and scroll animation.

https://github.com/AETumiApp

**Post 6**
The goal is not more generated websites.
The goal is better starting points and a faster path to something worth shipping.

https://aetumi.app/

# LinkedIn

## Company introduction post

**The web is becoming spatial, interactive and AI-assisted. AETumi is being built for that shift.**

AETumi is an AI-native 3D web platform for teams building production-ready interactive experiences with Three.js, WebGL, Next.js and React.

The ecosystem connects:

• 3D websites and interactive scenes
• reusable components and WebGL effects
• AI-ready prompts
• Claude Code, Cursor and Codex workflows
• AETumi MCP
• production architecture, SEO and operating tools

We are publishing the technical layer publicly through the AETumi GitHub organization so developers can see the architecture and implementation thinking behind the platform.

Website: https://aetumi.app/
GitHub: https://github.com/AETumiApp

#3DWeb #Threejs #WebGL #Nextjs #AICoding

## Founder/technical angle

**AI makes the first draft cheaper. Taste and production discipline become more valuable, not less.**

A generic prompt can generate a generic page quickly. The harder problems begin after that: interaction, camera behavior, responsive motion, GPU performance, semantic HTML, accessibility and maintainable source.

That is the problem space AETumi is focused on.

We are connecting high-quality 3D web starting points with Three.js, WebGL, Next.js, React and AI coding workflows so teams can move faster without treating production engineering as an afterthought.

Technical work: https://github.com/AETumiApp
Platform: https://aetumi.app/

#Threejs #WebDevelopment #AICoding #CreativeDevelopment

# Reddit / developer communities

Do not post this as a generic ad. Adapt it to the rules and context of each community.

## Technical discussion draft

**Title:** How I structure a Three.js landing page so the 3D layer does not destroy SEO and mobile performance

A pattern that has worked well for us is to treat the Three.js canvas as an enhancement layer rather than the entire page architecture.

The page keeps the important content in semantic HTML, then mounts the 3D scene inside a deliberate client boundary. Large models and environments load progressively, reduced-motion users receive a calmer version, and the layout still makes sense if WebGL fails.

The rough separation is:

1. server/semantic content
2. application UI
3. client 3D scene
4. asset loader
5. interaction controller
6. reduced-motion / non-WebGL fallback
7. analytics

The biggest mistakes I keep seeing are loading every asset at startup, tying React state to every animation frame, and making critical copy exist only inside a canvas.

We have been documenting this architecture while building AETumi. If linking is allowed in the community, disclose affiliation clearly before adding a relevant technical repo.

# YouTube

## Search-driven video titles

1. Three.js Product Viewer for Ecommerce — Architecture Breakdown
2. Next.js + Three.js: Production Website Architecture
3. WebGL Shader Backgrounds: Performance Checklist
4. Three.js Scroll Animation Without Janky Scrolling
5. React Three Fiber Product Scene — Production Pattern
6. Claude Code + Three.js: Build an Interactive Website
7. AI Prompt to 3D Website: A Better Technical Brief
8. How Agencies Can Build 3D Websites Faster
9. Three.js SEO: Keep Content Search-Friendly
10. WebGL vs Three.js for Interactive Websites

## Reusable description opening

AETumi is an AI-native 3D web platform for Three.js, WebGL, Next.js, React and AI coding workflows. In this video we break down [TOPIC] and the production decisions behind it.

Explore the relevant AETumi resource: [EXACT LANDING PAGE]
Developer examples: [EXACT GITHUB REPO]

## Hashtag pool

Use only 3–5 per video:

`#Threejs` `#WebGL` `#Nextjs` `#React` `#AICoding` `#3DWeb` `#CreativeDevelopment`

# Shorts / TikTok / Reels

## Hook format

0–2s: visual result first
2–5s: name the technical problem
5–12s: show the mechanism
12–16s: reveal before/after or final interaction
16–20s: AETumi + exact topic CTA

## Hooks

- “This is not a video. It is a live Three.js product scene.”
- “AI made the page. Then we fixed the part AI usually gets wrong.”
- “A 3D website can still be SEO-friendly. The canvas is not the whole page.”
- “This scroll controls the camera, lighting and product assembly.”
- “Three.js on mobile fails when you ignore these three things.”
- “Claude Code can build a 3D scene faster when the brief looks like this.”
- “WebGL effect or product experience? The architecture is different.”

## Caption pattern

[SEARCH INTENT] built as a production-oriented 3D web experience with AETumi.

Three.js · WebGL · Next.js · React

Explore: [EXACT URL]

# Pinterest

## Board structure

- 3D Website Design
- Three.js Websites
- WebGL Design & Shaders
- Interactive Ecommerce Websites
- 3D Product Viewers
- 3D Scroll Websites
- Luxury Web Design
- Agency Website Inspiration
- AI Web Design Prompts

Every pin should point to the closest relevant hub or article rather than the homepage by default.

## Pin title examples

- Three.js Product Viewer for Ecommerce
- Interactive 3D Website Hero with WebGL
- Luxury 3D Website Design Inspiration
- Scroll-Driven 3D Product Reveal
- WebGL Shader Background for Modern Websites
- Next.js Three.js Landing Page Architecture

# Facebook

Use Facebook primarily for video distribution, founder/company updates and retargetable engagement rather than developer SEO.

Post format:
- short hook
- 10–30 second visual
- one clear AETumi use case
- exact destination URL

# Instagram

Use Reels for high-impact visual proof and carousels for architecture/process.

Carousel idea:
1. final 3D web frame
2. semantic HTML layer
3. Three.js/WebGL layer
4. interaction/motion layer
5. mobile/fallback layer
6. AI coding workflow
7. AETumi resource CTA

# DEV / Hashnode

High-value article topics:

- Production Architecture for Next.js + Three.js
- How to Build a Three.js Product Viewer Without Destroying Mobile Performance
- React Three Fiber State: What Belongs in React and What Belongs in the Render Loop
- WebGL Shader Performance Checklist for Marketing Websites
- Claude Code + Three.js: Writing a Better Implementation Brief

Publish substantial technical content. Link to the relevant AETumi article and GitHub repo naturally. Do not syndicate 23 lightly rewritten marketing articles.

# Content atom model

One strong technical topic can become:

1 SEO article
→ 1 GitHub GUIDE
→ 1 code/example
→ 1 long video
→ 3–5 Shorts/Reels/TikToks
→ 1 X thread
→ 1 LinkedIn post
→ 3–5 Pinterest pins
→ optional Reddit/DEV contribution

This is how 23 articles can become 150–250 useful distribution assets without creating 250 near-identical spam posts.

# Attribution

Every outbound campaign should use unique UTM values.

Minimum fields:
- utm_source
- utm_medium
- utm_campaign
- utm_content
- search_intent
- creative_id
- landing_page

The exact landing page matters more than dumping all traffic onto the homepage.