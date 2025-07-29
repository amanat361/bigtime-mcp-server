import { MCPServer } from "mcp-framework";
import { join } from "path";

const server = new MCPServer({
  name: "bigtime-mcp-server",
  version: "0.2.2",
  basePath: join(process.cwd(), "dist"),
  transport: {
    type: "stdio"
  }
});

server.start();