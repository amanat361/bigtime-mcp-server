import { MCPTool } from "mcp-framework";
import { z } from "zod";
import { BigTimeClient, getBigTimeCredentials, BigTimeCredentialsError } from "../bigtime/index.js";

const GetClientsSchema = z.object({
  showInactive: z.boolean().optional().describe("Whether to include inactive clients (default: false)"),
  limit: z.number().optional().describe("Maximum number of clients to return (default: 50, max: 1000)"),
  offset: z.number().optional().describe("Number of clients to skip for pagination (default: 0)"),
});

class GetClientsTool extends MCPTool {
  name = "get-clients";
  description = "Get clients from BigTime API";
  schema = GetClientsSchema;

  async execute(input: z.infer<typeof GetClientsSchema>) {
    try {
      // Validate pagination parameters
      const limit = Math.min(input.limit || 50, 1000);
      const offset = Math.max(input.offset || 0, 0);
      
      // Get credentials from environment
      const credentials = getBigTimeCredentials();
      
      // Create BigTime client
      const client = new BigTimeClient(credentials);
      
      // Fetch clients data
      const allClients = await client.getClients(input.showInactive || false);
      
      // Apply pagination
      const paginatedClients = allClients.slice(offset, offset + limit);
      
      return {
        success: true,
        data: paginatedClients,
        pagination: {
          total: allClients.length,
          offset,
          limit,
          hasMore: offset + limit < allClients.length,
          returned: paginatedClients.length
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

export default GetClientsTool;