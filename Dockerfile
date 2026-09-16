# AETumi MCP — stdio server (Glama / registry build target)
FROM node:20-alpine
WORKDIR /app

# Install deps first for layer caching
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

# App
COPY index.mjs ./

# The MCP server speaks over stdio (JSON-RPC). Registries introspect by
# launching this and completing the MCP initialize + tools/list handshake.
ENTRYPOINT ["node", "index.mjs"]
