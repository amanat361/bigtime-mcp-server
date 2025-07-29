import { MCPServer } from "mcp-framework";
import { join } from "path";

const server = new MCPServer({
  name: "bigtime-mcp-server",
  version: "0.2.4",
  basePath: join(process.cwd(), "dist"),
  transport: {
    type: "http-stream",
    options: {
      port: 8080,
      cors: {
        allowOrigin: "*",
      },
    },
  },
});

server.start();