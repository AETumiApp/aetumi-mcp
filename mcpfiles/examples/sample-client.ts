/**
 * Minimal MCP client that connects to the AETumi MCP server, lists its tools,
 * and calls a search tool. Illustrates the integration; tool names/args come
 * from the live server's tool list (do not hard-code beyond discovery).
 *
 *   npm i @modelcontextprotocol/sdk
 *   AETUMI_TOKEN=... npx tsx examples/sample-client.ts
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main(): Promise<void> {
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@aetumi/mcp"],
    env: { AETUMI_TOKEN: process.env.AETUMI_TOKEN ?? "" },
  });

  const client = new Client(
    { name: "aetumi-sample-client", version: "1.0.0" },
    { capabilities: {} }
  );
  await client.connect(transport);

  // Discover what the server exposes — never assume tool names.
  const { tools } = await client.listTools();
  console.log("Tools:", tools.map((t) => t.name).join(", "));

  const { resources } = await client.listResources().catch(() => ({ resources: [] }));
  console.log("Resources:", resources.map((r) => r.uri).join(", ") || "(none)");

  // Call the first tool whose name looks like a search, passing a query.
  const search = tools.find((t) => /search|find|browse/i.test(t.name));
  if (search) {
    const res = await client.callTool({
      name: search.name,
      arguments: { query: "cinematic 3D hero", stack: "nextjs" },
    });
    console.log("Result:", JSON.stringify(res, null, 2));
  }

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
