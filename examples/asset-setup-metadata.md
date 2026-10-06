# Asset setup metadata: framework, dependencies and setup from the AETumi MCP

The hosted AETumi MCP server (`https://mcp.aetumi.app`) now returns setup metadata for catalog assets, so an AI coding assistant can check that a Three.js or WebGL asset fits a project **before** it recommends it.

This came from a question a developer building MCP tools asked us: *when an agent pulls a scene into a Next.js app, does the tool return the dependencies and setup steps with it?* It did not. Now it does.

## What changed

`get_3d_web_asset` returns three extra fields when setup metadata exists for an asset:

| Field | Type | What it holds |
|---|---|---|
| `frameworks` | string[] | What the asset targets, e.g. `Next.js 16.2.0`, `React 19.2.4`, or `Static HTML (no build step)` |
| `dependencies` | object | Package name to version, read from the asset's own source |
| `setupSummary` | string | One line on how to run it |

Nothing was removed or renamed. Assets without metadata return exactly what they returned before, so existing clients keep working.

## Coverage

- 83 of 147 code assets (3D scenes, templates, sections) carry setup metadata today.
- 28 of those are full Next.js / React projects, read from `package.json` and the lockfile.
- 55 are single-file Three.js scenes, where the version comes from the import in the HTML file.
- A few templates declare version ranges (for example `^1.3.19`) rather than exact versions. Those are returned as declared.

## Example: a Next.js template

Request:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": { "name": "get_3d_web_asset", "arguments": { "id": "altitude" } }
}
```

Text result:

```text
Altitude
Category: template
Price: $19 (lifetime, one-time)
Stack: hero, nextjs
Editable source: included with a matching plan
License at https://aetumi.app/pricing
Works with: Next.js 16.2.0, React 19.2.4
Dependencies: @react-spring/web@10.0.3, lenis@1.3.23, next@16.2.0, react@19.2.4, react-dom@19.2.4, resize-observer-polyfill@1.5.1, spring-text-engine@0.1.5, zod@4.3.6, zustand@5.0.12
Setup: Full Next.js project. Run `yarn install`, then `yarn run dev`.
Full setup guide and a minimal example are included with the license.
```

## Example: a single-file Three.js scene

```text
Blob
Category: 3d_scene
Works with: Static HTML (no build step)
Dependencies: three@0.143.0
Setup: Single self-contained HTML file, no build step. Three.js 0.143.0 loads from a CDN. Open it in a browser or serve it as a static file.
```

## Why it matters for agent workflows

An agent choosing an asset for a project needs to answer one question first: *will this run in the stack that is already here?* With `frameworks` and `dependencies` in the tool result, the agent can compare against the project's `package.json` and avoid suggesting a React 19 template for a React 18 codebase, or a build-step project where a drop-in HTML scene would do.

The public metadata stops at what you need to decide. The source, the full setup guide and a minimal example ship with the license.

## Try it

```bash
claude mcp add --transport http aetumi https://mcp.aetumi.app
```

Then ask your assistant: *"Find a Three.js hero for a Next.js 16 landing page and tell me what it depends on."*

- MCP overview: https://aetumi.app/mcp/
- Three.js library: https://aetumi.app/threejs/
- Pricing: https://aetumi.app/pricing
