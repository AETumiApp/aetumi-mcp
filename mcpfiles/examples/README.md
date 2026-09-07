# AETumi MCP — integration examples

Runnable, non-proprietary examples showing how to connect the AETumi MCP server to an AI coding assistant. These illustrate the *integration shape*; the server package, auth token, and the real tool/resource catalog come from your AETumi Full Stack account and the server itself (clients discover tools at runtime — never hard-code beyond discovery).

- `claude-code-config.json` — register the AETumi MCP server in Claude Code.
- `cursor-config.json` — the same shape for Cursor / Codex / other MCP-aware clients.
- `sample-client.ts` — a minimal `@modelcontextprotocol/sdk` client that connects, lists tools/resources, and calls a search tool.

See `../reference/` for example tool and resource schemas. Full docs: https://aetumi.app/mcp/
