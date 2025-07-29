import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetProjectDetailInput {
  projectId: number;
  view?: "Basic" | "Detailed";
}

class GetProjectDetailTool extends MCPTool<GetProjectDetailInput> {
  name = "get-project-detail";
  description = "Get detailed information about a specific project from BigTime API";

  schema = {
    projectId: {
      type: z.number(),
      description: "The SystemId of the project to get details for",
    },
    view: {
      type: z.enum(["Basic", "Detailed"]).optional(),
      description: "The view type (Basic or Detailed, default: Detailed)",
    },
  };

  async execute(input: GetProjectDetailInput) {
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