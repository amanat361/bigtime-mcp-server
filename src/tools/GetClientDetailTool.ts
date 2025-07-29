import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetClientDetailSchema = z.object({
  clientId: z.number().describe("The SystemId of the client to get details for"),
  view: z.enum(["Basic", "Detailed"]).optional().describe("The view type (Basic or Detailed, default: Detailed)"),
});

class GetClientDetailTool extends MCPTool {
  name = "get-client-detail";
  description = "Get detailed information about a specific client from BigTime API";
  schema = GetClientDetailSchema;

  async execute(input: z.infer<typeof GetClientDetailSchema>) {
    try {
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch client detail data
      const clientDetail = await client.getClientDetail(
        input.clientId, 
        input.view || "Detailed"
      );
      
      return {
        success: true,
        data: clientDetail,
        clientId: input.clientId,
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

export default GetClientDetailTool;