import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetStaffDetailInput {
  staffId: number;
  view?: "Basic" | "Detailed";
}

class GetStaffDetailTool extends MCPTool<GetStaffDetailInput> {
  name = "get-staff-detail";
  description = "Get detailed information about a specific staff member from BigTime API";

  schema = {
    staffId: {
      type: z.number(),
      description: "The StaffSid of the staff member to get details for",
    },
    view: {
      type: z.enum(["Basic", "Detailed"]).optional(),
      description: "The view type (Basic or Detailed, default: Detailed)",
    },
  };

  async execute(input: GetStaffDetailInput) {
    try {
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch staff detail data
      const staffDetail = await client.getStaffDetail(
        input.staffId, 
        input.view || "Detailed"
      );
      
      return {
        success: true,
        data: staffDetail,
        staffId: input.staffId,
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

export default GetStaffDetailTool;