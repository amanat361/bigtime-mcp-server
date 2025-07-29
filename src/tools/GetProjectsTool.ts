import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetProjectsInput {
  showInactive?: boolean;
  limit?: number;
  offset?: number;
}

class GetProjectsTool extends MCPTool<GetProjectsInput> {
  name = "get-projects";
  description = "Get projects from BigTime API";

  schema = {
    showInactive: {
      type: z.boolean().optional(),
      description: "Whether to include inactive projects (default: false)",
    },
    limit: {
      type: z.number().optional(),
      description: "Maximum number of projects to return (default: 50, max: 1000)",
    },
    offset: {
      type: z.number().optional(),
      description: "Number of projects to skip for pagination (default: 0)",
    },
  };

  async execute(input: GetProjectsInput) {
    try {
      // Validate pagination parameters
      const limit = Math.min(input.limit || 50, 1000);
      const offset = Math.max(input.offset || 0, 0);
      
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch projects data
      const allProjects = await client.getProjects(input.showInactive || false);
      
      // Apply pagination
      const paginatedProjects = allProjects.slice(offset, offset + limit);
      
      return {
        success: true,
        data: paginatedProjects,
        pagination: {
          total: allProjects.length,
          offset,
          limit,
          hasMore: offset + limit < allProjects.length,
          returned: paginatedProjects.length
        },
        showingInactive: input.showInactive || false
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

export default GetProjectsTool;