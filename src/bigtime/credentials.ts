import { BigTimeCredentials } from './types/index.js';

/**
 * Error thrown when there's an issue with BigTime credentials
 */
export class BigTimeCredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BigTimeCredentialsError';
  }
}

/**
 * Get BigTime credentials from environment variables
 * 
 * @returns BigTime credentials
 * @throws BigTimeCredentialsError if credentials are missing
 */
export function getBigTimeCredentials(): BigTimeCredentials {
  const token = process.env.BIGTIME_API_TOKEN;
  const firmId = process.env.BIGTIME_FIRM_ID;

  if (!token) {
    throw new BigTimeCredentialsError(
      'BIGTIME_API_TOKEN environment variable is required'
    );
  }

  if (!firmId) {
    throw new BigTimeCredentialsError(
      'BIGTIME_FIRM_ID environment variable is required'
    );
  }

  return {
    token,
    firmId,
  };
}