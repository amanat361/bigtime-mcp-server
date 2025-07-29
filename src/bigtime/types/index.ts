/**
 * Central export file for all BigTime API types
 */

// Export all staff-related types
export * from './staff.js';

// Export all project-related types
export * from './projects.js';

// Export all client-related types
export * from './clients.js';

// Export all task-related types
export * from './tasks.js';

// Export all time-related types
export * from './time.js';

/**
 * BigTime API response when establishing a session
 */
export interface BigTimeSessionResponse {
  firm: string;
  token: string;
  staffsid?: number;
  userid?: number;
  fname?: string;
  sname?: string;
  IsFirmAdmin?: boolean;
  IsFirmOwner?: boolean;
  FirmCount?: number;
  SubscriptionType?: number;
}

/**
 * Credentials for authenticating with BigTime API
 */
export interface BigTimeCredentials {
  token: string;
  firmId: string;
}

/**
 * Common response structure for BigTime actions
 */
export interface BigTimeActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  errorType?: string;
  details?: string;
  status?: number;
}

/**
 * Error types that can be returned from BigTime actions
 */
export enum BigTimeErrorType {
  ConnectionError = 'ConnectionError',
  APIError = 'APIError',
  AuthenticationError = 'AuthenticationError',
  NotFoundError = 'NotFoundError',
  PermissionError = 'PermissionError',
  ValidationError = 'ValidationError',
  RateLimitError = 'RateLimitError',
  UnknownError = 'UnknownError'
}