import {
  BigTimeCredentials,
  BigTimeStaff,
  BigTimeStaffDetail,
  BigTimeStaffPicklist,
  BigTimeProject,
  BigTimeProjectDetail,
  BigTimeProjectPicklist,
  BigTimeClient as BigTimeClientType,
  BigTimeClientDetail,
  BigTimeClientPicklist,
  BigTimeTask,
  BigTimeTaskDetail,
  BigTimeTimeEntry,
  BigTimeTimeEntryCreate,
  BigTimeDailyTotal,
} from './types/index.js';

/**
 * Simplified BigTime API client for MCP server
 */
export class BigTimeClient {
  private baseUrl = "https://iq.bigtime.net/BigtimeData/api/v2";
  private credentials: BigTimeCredentials;

  /**
   * Create a new BigTimeClient
   * 
   * @param credentials Token and firmId for authentication
   */
  constructor(credentials: BigTimeCredentials) {
    this.credentials = credentials;
  }

  /**
   * Generic fetch method for BigTime API
   * 
   * @param endpoint API endpoint path
   * @param method HTTP method
   * @param body Optional request body
   * @returns Parsed JSON response
   */
  private async fetch<T>(
    endpoint: string,
    method: "GET" | "POST" | "DELETE" = "GET",
    body?: any
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Auth-ApiToken": this.credentials.token,
      "X-Auth-Realm": this.credentials.firmId,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`BigTime API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // =========================================================================
  // STAFF METHODS
  // =========================================================================

  /**
   * Get a list of staff from the picklist endpoint
   * 
   * @returns Array of BigTime staff members in simplified format
   */
  async getStaffPicklist(): Promise<BigTimeStaffPicklist[]> {
    return this.fetch<BigTimeStaffPicklist[]>("picklist/staff");
  }

  /**
   * Get a list of all staff members with basic details
   * 
   * @param showInactive Whether to include inactive staff (default: false)
   * @returns Array of BigTime staff members
   */
  async getStaff(showInactive: boolean = false): Promise<BigTimeStaff[]> {
    const queryString = showInactive ? "?ShowInactive=true" : "";
    return this.fetch<BigTimeStaff[]>(`staff${queryString}`);
  }

  /**
   * Get detailed information about a specific staff member
   * 
   * @param staffId The StaffSid of the staff member
   * @param view The view type (Basic or Detailed)
   * @returns Detailed staff information
   */
  async getStaffDetail(
    staffId: number, 
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeStaffDetail> {
    return this.fetch<BigTimeStaffDetail>(
      `staff/detail/${staffId}?View=${view}`
    );
  }

  // =========================================================================
  // PROJECT METHODS
  // =========================================================================

  /**
   * Get a list of projects from the picklist endpoint
   * 
   * @returns Array of BigTime projects in simplified format
   */
  async getProjectsPicklist(): Promise<BigTimeProjectPicklist[]> {
    return this.fetch<BigTimeProjectPicklist[]>("picklist/projects");
  }

  /**
   * Get a list of all projects with basic details
   * 
   * @param showInactive Whether to include inactive projects (default: false)
   * @returns Array of BigTime projects
   */
  async getProjects(showInactive: boolean = false): Promise<BigTimeProject[]> {
    const queryString = showInactive ? "?ShowInactive=true" : "";
    return this.fetch<BigTimeProject[]>(`project${queryString}`);
  }

  /**
   * Get detailed information about a specific project
   * 
   * @param projectId The SystemId of the project
   * @param view The view type (Basic or Detailed)
   * @returns Detailed project information
   */
  async getProjectDetail(
    projectId: number, 
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeProjectDetail> {
    return this.fetch<BigTimeProjectDetail>(
      `project/detail/${projectId}?View=${view}`
    );
  }

  // =========================================================================
  // CLIENT METHODS
  // =========================================================================

  /**
   * Get a list of clients from the picklist endpoint
   * 
   * @returns Array of BigTime clients in simplified format
   */
  async getClientsPicklist(): Promise<BigTimeClientPicklist[]> {
    return this.fetch<BigTimeClientPicklist[]>("picklist/clients");
  }

  /**
   * Get a list of all clients with basic details
   * 
   * @param showInactive Whether to include inactive clients (default: false)
   * @returns Array of BigTime clients
   */
  async getClients(showInactive: boolean = false): Promise<BigTimeClientType[]> {
    const queryString = showInactive ? "?ShowInactive=true" : "";
    return this.fetch<BigTimeClientType[]>(`client${queryString}`);
  }

  /**
   * Get detailed information about a specific client
   * 
   * @param clientId The SystemId of the client
   * @param view The view type (Basic or Detailed)
   * @returns Detailed client information
   */
  async getClientDetail(
    clientId: number, 
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeClientDetail> {
    return this.fetch<BigTimeClientDetail>(
      `client/detail/${clientId}?View=${view}`
    );
  }

  // =========================================================================
  // TASK METHODS
  // =========================================================================

  /**
   * Get a list of tasks by project
   * 
   * @param projectId The SystemId of the project
   * @param showCompleted Whether to include completed tasks (default: false)
   * @returns Array of tasks for the project
   */
  async getTasksByProject(
    projectId: number,
    showCompleted: boolean = false
  ): Promise<BigTimeTask[]> {
    const queryString = showCompleted ? "?showCompleted=true" : "";
    return this.fetch<BigTimeTask[]>(`task/listByProject/${projectId}${queryString}`);
  }

  /**
   * Get a list of tasks by staffer
   * 
   * @param staffId The StaffSid of the staffer
   * @param showCompleted Whether to include completed tasks (default: false)
   * @returns Array of tasks for the staffer
   */
  async getTasksByStaffer(
    staffId: number,
    showCompleted: boolean = false
  ): Promise<BigTimeTask[]> {
    const queryString = showCompleted ? "?showCompleted=true" : "";
    return this.fetch<BigTimeTask[]>(`task/ListByStaffer/${staffId}${queryString}`);
  }

  /**
   * Get detailed information about a specific task
   * 
   * @param taskId The TaskSid of the task
   * @param view The view type (Basic or Detailed)
   * @returns Detailed task information
   */
  async getTaskDetail(
    taskId: number, 
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeTaskDetail> {
    return this.fetch<BigTimeTaskDetail>(`task/detail/${taskId}?View=${view}`);
  }

  // =========================================================================
  // TIME ENTRY METHODS
  // =========================================================================

  /**
   * Get time entries for a specific staff member and date range
   * 
   * @param staffId The StaffSid of the staff member
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @param view The view type (Basic or Detailed)
   * @returns Array of time entries
   */
  async getTimeSheet(
    staffId: number,
    startDate: string,
    endDate: string,
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeTimeEntry[]> {
    const queryParams = [
      `StartDt=${startDate}`,
      `EndDt=${endDate}`,
      `View=${view}`
    ].join("&");
    
    return this.fetch<BigTimeTimeEntry[]>(`time/Sheet/${staffId}?${queryParams}`);
  }

  /**
   * Get time entries for a specific project and date range
   * 
   * @param projectId The ProjectSid of the project
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @param view The view type (Basic or Detailed)
   * @returns Array of time entries
   */
  async getTimeByProject(
    projectId: number,
    startDate: string,
    endDate: string,
    view: "Basic" | "Detailed" = "Detailed"
  ): Promise<BigTimeTimeEntry[]> {
    const queryParams = [
      `StartDt=${startDate}`,
      `EndDt=${endDate}`,
      `View=${view}`
    ].join("&");
    
    return this.fetch<BigTimeTimeEntry[]>(`time/ByProject/${projectId}?${queryParams}`);
  }

  /**
   * Get daily totals for a staff member
   * 
   * @param staffId The StaffSid of the staff member
   * @param startDate Start date in YYYY-MM-DD format
   * @param endDate End date in YYYY-MM-DD format
   * @returns Array of daily totals
   */
  async getDailyTotals(
    staffId: number,
    startDate: string,
    endDate: string
  ): Promise<BigTimeDailyTotal[]> {
    const queryParams = [
      `StartDt=${startDate}`,
      `EndDt=${endDate}`
    ].join("&");
    
    return this.fetch<BigTimeDailyTotal[]>(`time/TotalByDay/${staffId}?${queryParams}`);
  }
}