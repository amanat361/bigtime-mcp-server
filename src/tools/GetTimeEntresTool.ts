import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetTimeEntriesSchema = z.object({
  staffId: z.number().optional().describe("The StaffSid of the staff member to get time entries for"),
  projectId: z.number().optional().describe("The ProjectSid of the project to get time entries for"),
  startDate: z.string().describe("Start date in YYYY-MM-DD format"),
  endDate: z.string().describe("End date in YYYY-MM-DD format"),
  view: z.enum(["Basic", "Detailed"]).optional().describe("The view type (Basic or Detailed, default: Detailed)"),
  limit: z.number().optional().describe("Maximum number of time entries to return (default: 50, max: 1000)"),
  offset: z.number().optional().describe("Number of time entries to skip for pagination (default: 0)"),
});

class GetTimeEntresTool extends MCPTool {
  name = "get-time-entries";
  description = "Get time entries from BigTime API for a staff member or project within a date range";
  schema = GetTimeEntriesSchema;

  async execute(input: z.infer<typeof GetTimeEntriesSchema>) {
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