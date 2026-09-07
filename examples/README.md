# AETumi MCP — examples

Expert, concrete developer material for driving premium 3D web work with the
**AETumi MCP server** from an AI coding assistant (Claude Code, Cursor, Codex).

The rich reference docs live at the **repo root** (owner-maintained) — start
there for install and the exact tool/resource names. This `examples/` folder is
the *applied* layer: how the pieces fit and what to actually do with them.

Hub: <https://aetumi.app/aetumi-mcp>

## Contents

| File | What it gives you |
| --- | --- |
| [`architecture.md`](./architecture.md) | The precise mental model — host, MCP client, the AETumi server, and its tools/resources/prompts — with an ASCII layer diagram and a Mermaid sequence of one real request. Read this first. |
| [`mcp-workflow-cookbook.md`](./mcp-workflow-cookbook.md) | Eight worked scenarios (cinematic hero, shader background, full landing, product viewer, reuse a scene, ship to a client, perf tuning, debug a black screen) — each with intent, what the agent does via MCP, and acceptance criteria. |

## The shape of every workflow

```
GROUND (resources) → PLAN (prompt) → GENERATE (tools) → VERIFY (browser tool) → HAND OFF (artifacts)
```

Ground the work in your *real* project context, plan the scene on paper and
approve it, generate against the plan, verify in a *running* page, and leave
durable markdown artifacts so the work travels between assistants.

## Baseline stack these examples assume

- **Next.js 14 (App Router), React 18, TypeScript, `three@0.160.0`.**
- **Server-rendered HTML + client-only 3D island** (`next/dynamic`,
  `ssr: false`) — copy and metadata are crawlable; WebGL runs only in the
  browser.
- **Accessibility and a performance budget are requirements, not polish** —
  reduced-motion, poster fallback, capped pixel ratio, full disposal.

## A note on accuracy

These examples name primitive *categories* (tools / resources / prompts), never
fabricated exact commands or flags. Where a step needs a concrete tool name,
take it from the server's root README so nothing here goes stale.

## Companion repos

- The cross-assistant five-phase loop these recipes slot into:
  <https://aetumi.app/ai-coding-3d-web>
- Briefs, planning prompts and the production checklist:
  <https://aetumi.app/claude-code-threejs>
- Copy-paste build prompts for specific scenes:
  <https://aetumi.app/3d-web-ai-prompts>
- Reference implementation of the client-island pattern:
  <https://aetumi.app/nextjs-threejs-starter>
