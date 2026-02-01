import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.json({
    message: 'SlackAttend API is running',
    healthCheck: '/api/health'
  });
}

