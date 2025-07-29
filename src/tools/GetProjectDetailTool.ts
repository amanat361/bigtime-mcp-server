import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetProjectDetailSchema = z.object({
  projectId: z.number().describe("The SystemId of the project to get details for"),
  view: z.enum(["Basic", "Detailed"]).optional().describe("The view type (Basic or Detailed, default: Detailed)"),
});

class GetProjectDetailTool extends MCPTool {
  name = "get-project-detail";
  description = "Get detailed information about a specific project from BigTime API";
  schema = GetProjectDetailSchema;

  async execute(input: z.infer<typeof GetProjectDetailSchema>) {
    try {
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch project detail data
      const projectDetail = await client.getProjectDetail(
        input.projectId, 
        input.view || "Detailed"
      );
      
      return {
        success: true,
        data: projectDetail,
        projectId: input.projectId,
        view: input.view || "Detailed"
      };
    } catch (error) {
      if (error instanceof BigTimeCredentialsError) {
        return {
          success: false,
          error: "Credentials Error",
          message: error.message
        };
      }
      
      return {
        success: false,
        error: "API Error",
        message: error instanceof Error ? error.message : "Unknown error occurred"
      };
    }
  }
}

export default GetProjectDetailTool;