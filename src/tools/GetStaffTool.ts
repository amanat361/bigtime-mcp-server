import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetStaffSchema = z.object({
  showInactive: z.boolean().optional().describe("Whether to include inactive staff members (default: false)"),
  limit: z.number().optional().describe("Maximum number of staff members to return (default: 50, max: 1000)"),
  offset: z.number().optional().describe("Number of staff members to skip for pagination (default: 0)"),
});

class GetStaffTool extends MCPTool {
  name = "get-staff";
  description = "Get staff members from BigTime API";
  schema = GetStaffSchema;

  async execute(input: z.infer<typeof GetStaffSchema>) {
    try {
      // Validate pagination parameters
      const limit = Math.min(input.limit || 50, 1000);
      const offset = Math.max(input.offset || 0, 0);
      
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch staff data
      const allStaff = await client.getStaff(input.showInactive || false);
      
      // Apply pagination
      const paginatedStaff = allStaff.slice(offset, offset + limit);
      
      return {
        success: true,
        data: paginatedStaff,
        pagination: {
          total: allStaff.length,
          offset,
          limit,
          hasMore: offset + limit < allStaff.length,
          returned: paginatedStaff.length
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

export default GetStaffTool;