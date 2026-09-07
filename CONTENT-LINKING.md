# AETumi Website ↔ GitHub Content Linking Map

AETumi's website and GitHub should reinforce the same entity graph without duplicating whole articles. The website is the canonical editorial/commercial layer; GitHub provides technical depth, examples and developer proof.

## Linking rule

For every technical AETumi article:

1. Link to **one primary GitHub repository** that matches the article's implementation intent.
2. Optionally link to **one or two secondary repositories** only when they materially help the reader.
3. The primary repository should link back to the most relevant AETumi hub or guide.
4. Do not copy the full article into GitHub. Add code, architecture notes, examples or implementation checklists instead.

## Topic → primary repository

| Website topic | Primary GitHub repository | Secondary repositories |
| --- | --- | --- |
| What is AETumi / developer ecosystem | `aetumi-mcp` | `ai-coding-3d-web` |
| Three.js fundamentals / components | `claude-code-threejs` | `aetumi-3d-components`, `nextjs-threejs-starter` |
| Three.js product viewer / ecommerce | `threejs-product-viewer` | `aetumi-3d-components`, `nextjs-threejs-starter` |
| Three.js scroll animation / scrollytelling | `threejs-scroll-animation` | `aetumi-3d-web-examples` |
| Next.js + Three.js | `nextjs-threejs-starter` | `react-three-fiber-examples` |
| React + WebGL components | `webgl-react-components` | `aetumi-3d-components` |
| WebGL shaders / GLSL | `webgl-shader-examples` | `webgl-react-components` |
| React Three Fiber | `react-three-fiber-examples` | `nextjs-threejs-starter` |
| AI prompts for 3D web | `3d-web-ai-prompts` | `ai-coding-3d-web` |
| Claude Code + Three.js | `claude-code-threejs` | `ai-coding-3d-web`, `aetumi-mcp` |
| Cursor / Codex / AI coding | `ai-coding-3d-web` | `aetumi-mcp` |
| MCP workflows | `aetumi-mcp` | `ai-coding-3d-web` |
| Interactive websites / immersive UX | `interactive-3d-web-examples` | `aetumi-3d-web-examples` |
| 3D website examples / inspiration | `aetumi-3d-web-examples` | `interactive-3d-web-examples` |
| 3D components / hero sections | `aetumi-3d-components` | `webgl-react-components` |
| Agency workflow / client delivery | `aetumi-agency-starter` | `aetumi-3d-web-examples` |

## Website hub → repository cluster

### https://aetumi.app/threejs/

Primary GitHub links:

- https://github.com/AETumiApp/claude-code-threejs
- https://github.com/AETumiApp/threejs-product-viewer
- https://github.com/AETumiApp/threejs-scroll-animation
- https://github.com/AETumiApp/nextjs-threejs-starter

### https://aetumi.app/webgl/

- https://github.com/AETumiApp/webgl-shader-examples
- https://github.com/AETumiApp/webgl-react-components

### https://aetumi.app/react-three-fiber/

- https://github.com/AETumiApp/react-three-fiber-examples
- https://github.com/AETumiApp/nextjs-threejs-starter

### https://aetumi.app/3d-components/

- https://github.com/AETumiApp/aetumi-3d-components
- https://github.com/AETumiApp/webgl-react-components
- https://github.com/AETumiApp/threejs-product-viewer

### https://aetumi.app/3d-scroll/

- https://github.com/AETumiApp/threejs-scroll-animation
- https://github.com/AETumiApp/aetumi-3d-web-examples

### https://aetumi.app/interactive-websites/

- https://github.com/AETumiApp/interactive-3d-web-examples
- https://github.com/AETumiApp/aetumi-3d-web-examples

### https://aetumi.app/3d-prompts/

- https://github.com/AETumiApp/3d-web-ai-prompts
- https://github.com/AETumiApp/ai-coding-3d-web

### https://aetumi.app/for-agencies/

- https://github.com/AETumiApp/aetumi-agency-starter
- https://github.com/AETumiApp/aetumi-3d-web-examples

### https://aetumi.app/mcp/

- https://github.com/AETumiApp/aetumi-mcp
- https://github.com/AETumiApp/ai-coding-3d-web
- https://github.com/AETumiApp/claude-code-threejs

## Anchor-text guidance

Use descriptive anchors such as:

- `Three.js product viewer example`
- `Next.js + Three.js architecture`
- `WebGL shader examples`
- `React Three Fiber examples`
- `Claude Code + Three.js workflow`
- `AETumi MCP developer repository`

Avoid repeating `click here`, naked URLs everywhere, or forcing the exact same keyword phrase into every article.

## Editorial principle

**Website explains the problem and intent. GitHub proves the implementation depth.**

That division gives search engines and AI retrieval systems multiple consistent sources without creating duplicate-content sludge.