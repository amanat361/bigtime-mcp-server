import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetTasksInput {
  projectId?: number;
  staffId?: number;
  showCompleted?: boolean;
  limit?: number;
  offset?: number;
}

class GetTasksTool extends MCPTool<GetTasksInput> {
  name = "get-tasks";
  description = "Get tasks from BigTime API by project or staff member";

  schema = {
    projectId: {
      type: z.number().optional(),
      description: "The SystemId of the project to get tasks for",
    },
    staffId: {
      type: z.number().optional(),
      description: "The StaffSid of the staff member to get tasks for",
    },
    showCompleted: {
      type: z.boolean().optional(),
      description: "Whether to include completed tasks (default: false)",
    },
    limit: {
      type: z.number().optional(),
      description: "Maximum number of tasks to return (default: 50, max: 1000)",
    },
    offset: {
      type: z.number().optional(),
      description: "Number of tasks to skip for pagination (default: 0)",
    },
  };

  async execute(input: GetTasksInput) {
    try {
      // Validate input - need either projectId or staffId
      if (!input.projectId && !input.staffId) {
        return {
          success: false,
          error: "Validation Error",
          message: "Either projectId or staffId must be provided"
        };
      }

      // Validate pagination parameters
      const limit = Math.min(input.limit || 50, 1000);
      const offset = Math.max(input.offset || 0, 0);

      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch tasks data
      let allTasks;
      let filterType;
      let filterId;
      
      if (input.projectId) {
        allTasks = await client.getTasksByProject(
          input.projectId, 
          input.showCompleted || false
        );
        filterType = "project";
        filterId = input.projectId;
      } else {
        allTasks = await client.getTasksByStaffer(
          input.staffId!, 
          input.showCompleted || false
        );
        filterType = "staff";
        filterId = input.staffId;
      }
      
      // Apply pagination
      const paginatedTasks = allTasks.slice(offset, offset + limit);
      
      return {
        success: true,
        data: paginatedTasks,
        pagination: {
          total: allTasks.length,
          offset,
          limit,
          hasMore: offset + limit < allTasks.length,
          returned: paginatedTasks.length
        },
        filterType,
        filterId,
        showingCompleted: input.showCompleted || false
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

export default GetTasksTool;