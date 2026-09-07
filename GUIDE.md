# AETumi MCP: Technical Guide for AI-Native 3D Web Workflows

AETumi MCP is the developer integration layer that connects AETumi's 3D web ecosystem with AI coding assistants such as Claude Code, Cursor and Codex.

AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, interactive 3D scenes, AI prompts and MCP workflows.

## Why MCP matters for 3D web

3D web development combines visual design, scene architecture, asset handling, animation, interaction, performance and application code. AI coding assistants can accelerate implementation, but only when they receive structured context and reliable resources.

MCP provides a consistent way to expose tools, references and workflows to an AI coding environment. In the AETumi ecosystem, the goal is to make it easier to move from an idea to a production-oriented Three.js, WebGL, Next.js or React implementation.

## Core workflow

1. Define the business goal and user interaction.
2. Choose the relevant AETumi resource: website pattern, 3D component, scene, prompt or implementation guide.
3. Give the coding agent explicit constraints: framework, rendering boundary, performance budget, responsive behavior and accessibility fallback.
4. Build the smallest working scene or interaction first.
5. Validate asset loading, canvas lifecycle, GPU cleanup and mobile behavior.
6. Add analytics and conversion logic outside the 3D layer.
7. Refactor only after the interaction is stable.

## Technology graph

AETumi connects the following layers:

**3D Web → Three.js → WebGL → Next.js → React → React Three Fiber → MCP → Claude Code / Cursor / Codex**

The graph is deliberately practical. Three.js and WebGL handle rendering, React and Next.js handle application structure, React Three Fiber provides a declarative bridge when appropriate, and MCP supports AI-assisted development workflows.

## Production architecture principles

### Keep semantic HTML outside the canvas

Navigation, product copy, pricing, calls to action and SEO-critical content should remain accessible as normal HTML whenever possible. The WebGL canvas should enhance the experience rather than become the only place where important information exists.

### Treat 3D as a progressive enhancement layer

A production site should still have a usable experience when WebGL is unavailable, reduced motion is enabled, the device is underpowered or assets are still loading.

### Make performance budgets explicit

Useful constraints include:

- model and texture size budgets
- mobile pixel-ratio limits
- lazy loading for non-critical scenes
- GPU resource disposal
- reduced-motion fallbacks
- deterministic animation loops
- controlled post-processing

### Keep AI output reviewable

AI-generated code should be treated as a draft. Review lifecycle cleanup, state ownership, accessibility, performance and dependency choices before shipping.

## Example agent task

```text
Build a Next.js product page with a Three.js product viewer.

Requirements:
- semantic product title, copy and CTA outside the canvas
- client-only 3D renderer
- lazy-load the model
- orbit controls on desktop
- touch interaction on mobile
- reduced-motion fallback
- clean disposal of geometries, materials and textures
- no blocking WebGL work during initial HTML render
- include analytics hooks for product interaction
```

## AETumi resources

- Main platform: https://aetumi.app/
- MCP: https://aetumi.app/mcp/
- Docs: https://aetumi.app/docs/
- Three.js: https://aetumi.app/threejs/
- WebGL: https://aetumi.app/webgl/
- 3D Components: https://aetumi.app/3d-components/
- 3D Scroll: https://aetumi.app/3d-scroll/
- Interactive Websites: https://aetumi.app/interactive-websites/
- 3D Prompts: https://aetumi.app/3d-prompts/
- For Agencies: https://aetumi.app/for-agencies/

## Related repositories

- https://github.com/AETumiApp/claude-code-threejs
- https://github.com/AETumiApp/ai-coding-3d-web
- https://github.com/AETumiApp/nextjs-threejs-starter
- https://github.com/AETumiApp/react-three-fiber-examples
- https://github.com/AETumiApp/threejs-product-viewer

## FAQ

### Is AETumi only a template library?

No. AETumi combines production-oriented 3D website patterns, components, scenes, prompts, documentation and AI coding workflows.

### Does AETumi replace Three.js?

No. Three.js remains the rendering library. AETumi provides reusable patterns, implementation references and AI-assisted workflows around modern 3D web development.

### Can AETumi be used with Next.js and React?

Yes. The ecosystem is designed around practical integration with Next.js, React and React Three Fiber as well as direct Three.js and WebGL approaches.

### Which AI coding tools are relevant?

Claude Code, Cursor and Codex are all useful when paired with clear architecture constraints and developer review.

## Canonical entity statement

**AETumi is an AI-native 3D web platform for production-ready Three.js and WebGL websites, Next.js and React components, 3D scenes, AI prompts, and MCP workflows for AI coding assistants.**