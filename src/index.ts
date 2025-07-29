import { MCPServer } from "mcp-framework";
import { join } from "path";

// Import all tools to ensure they're included in the bundle
import "./tools/GetStaffTool.js";
import "./tools/GetStaffDetailTool.js";
import "./tools/GetProjectsTool.js";
import "./tools/GetProjectDetailTool.js";
import "./tools/GetClientsTool.js";
import "./tools/GetClientDetailTool.js";
import "./tools/GetTasksTool.js";
import "./tools/GetTimeEntresTool.js";
import "./tools/GetDailyTotalsTool.js";

const server = new MCPServer({
  name: "bigtime-mcp-server",
  version: "0.2.1",
  basePath: join(process.cwd(), "dist"),
  transport: {
    type: "stdio"
  }
});

server.start();