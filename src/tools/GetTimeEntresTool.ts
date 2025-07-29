import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetTimeEntriesInput {
  staffId?: number;
  projectId?: number;
  startDate: string;
  endDate: string;
  view?: "Basic" | "Detailed";
  limit?: number;
  offset?: number;
}

class GetTimeEntresTool extends MCPTool<GetTimeEntriesInput> {
  name = "get-time-entries";
  description = "Get time entries from BigTime API for a staff member or project within a date range";

  schema = {
    staffId: {
      type: z.number().optional(),
      description: "The StaffSid of the staff member to get time entries for",
    },
    projectId: {
      type: z.number().optional(),
      description: "The ProjectSid of the project to get time entries for",
    },
    startDate: {
      type: z.string(),
      description: "Start date in YYYY-MM-DD format",
    },
    endDate: {
      type: z.string(),
      description: "End date in YYYY-MM-DD format",
    },
    view: {
      type: z.enum(["Basic", "Detailed"]).optional(),
      description: "The view type (Basic or Detailed, default: Detailed)",
    },
    limit: {
      type: z.number().optional(),
      description: "Maximum number of time entries to return (default: 50, max: 1000)",
    },
    offset: {
      type: z.number().optional(),
      description: "Number of time entries to skip for pagination (default: 0)",
    },
  };

  async execute(input: GetTimeEntriesInput) {
    try {
      // Validate input - need either staffId or projectId
      if (!input.staffId && !input.projectId) {
        return {
          success: false,
          error: "Validation Error",
          message: "Either staffId or projectId must be provided"
        };
      }

      // Validate date format (basic validation)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(input.startDate) || !dateRegex.test(input.endDate)) {
        return {
          success: false,
          error: "Validation Error",
          message: "Dates must be in YYYY-MM-DD format"
        };
      }

      // Validate pagination parameters
      const limit = Math.min(input.limit || 50, 1000);
      const offset = Math.max(input.offset || 0, 0);

      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch time entries data
      let allTimeEntries;
      let filterType;
      let filterId;
      
      if (input.staffId) {
        allTimeEntries = await client.getTimeSheet(
          input.staffId,
          input.startDate,
          input.endDate,
          input.view || "Detailed"
        );
        filterType = "staff";
        filterId = input.staffId;
      } else {
        allTimeEntries = await client.getTimeByProject(
          input.projectId!,
          input.startDate,
          input.endDate,
          input.view || "Detailed"
        );
        filterType = "project";
        filterId = input.projectId;
      }
      
      // Apply pagination
      const paginatedTimeEntries = allTimeEntries.slice(offset, offset + limit);
      
      return {
        success: true,
        data: paginatedTimeEntries,
        pagination: {
          total: allTimeEntries.length,
          offset,
          limit,
          hasMore: offset + limit < allTimeEntries.length,
          returned: paginatedTimeEntries.length
        },
        filterType,
        filterId,
        startDate: input.startDate,
        endDate: input.endDate,
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

export default GetTimeEntresTool;