import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetDailyTotalsSchema = z.object({
  staffId: z.number().describe("The StaffSid of the staff member to get daily totals for"),
  startDate: z.string().describe("Start date in YYYY-MM-DD format"),
  endDate: z.string().describe("End date in YYYY-MM-DD format"),
});

class GetDailyTotalsTool extends MCPTool {
  name = "get-daily-totals";
  description = "Get daily time totals for a staff member from BigTime API";
  schema = GetDailyTotalsSchema;

  async execute(input: z.infer<typeof GetDailyTotalsSchema>) {
    try {
      // Validate date format (basic validation)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(input.startDate) || !dateRegex.test(input.endDate)) {
        return {
          success: false,
          error: "Validation Error",
          message: "Dates must be in YYYY-MM-DD format"
        };
      }

      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch daily totals data
      const dailyTotals = await client.getDailyTotals(
        input.staffId,
        input.startDate,
        input.endDate
      );
      
      return {
        success: true,
        data: dailyTotals,
        count: dailyTotals.length,
        staffId: input.staffId,
        startDate: input.startDate,
        endDate: input.endDate
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

export default GetDailyTotalsTool;