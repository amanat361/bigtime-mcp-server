import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

interface GetClientDetailInput {
  clientId: number;
  view?: "Basic" | "Detailed";
}

class GetClientDetailTool extends MCPTool<GetClientDetailInput> {
  name = "get-client-detail";
  description = "Get detailed information about a specific client from BigTime API";

  schema = {
    clientId: {
      type: z.number(),
      description: "The SystemId of the client to get details for",
    },
    view: {
      type: z.enum(["Basic", "Detailed"]).optional(),
      description: "The view type (Basic or Detailed, default: Detailed)",
    },
  };

  async execute(input: GetClientDetailInput) {
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