# SlackAttend

A full-stack application with Express.js backend API and React frontend for health check monitoring.

## Project Structure

```
SlackAttend/
├── api/              # Vercel serverless functions (used for both local dev and production)
├── frontend/         # Frontend React App (TypeScript)
├── vercel.json       # Vercel deployment configuration
└── ...
```

## Backend Setup

The backend uses Vercel serverless functions. For local development:

1. Install dependencies:
```bash
npm install
```

2. Start the development server (runs both API and frontend):
```bash
npm run dev
```

This will start:
- API serverless functions on `http://localhost:3000/api`
- Frontend on `http://localhost:3001` (if you run `npm run dev:frontend` separately)

**Note**: The `src/index.ts` Express server is no longer needed. We use Vercel serverless functions (`api/` directory) for both local development and production.

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend runs on **port 3001** by default.

## Running Both Services

### Option 1: Using Vercel Dev (Recommended)
This runs both API and frontend together:
```bash
npm run dev
```

### Option 2: Separate Terminals
1. Terminal 1 - API + Frontend (via Vercel):
```bash
npm run dev
```

2. Terminal 2 - Frontend only (for faster frontend development):
```bash
npm run dev:frontend
```

## API Endpoints

### Health Check
- **GET** `http://localhost:3000/api/health` (local) or `/api/health` (production)
  - Returns server health status, timestamp, uptime, and environment

### Root
- **GET** `http://localhost:3000/api` (local) or `/api` (production)
  - Returns API information

## Frontend Features

- Real-time health status monitoring
- Auto-refresh every 5 seconds
- Manual refresh button
- Error handling with retry functionality
- Beautiful, modern UI

## Environment Variables

### Backend
- `NODE_ENV` - Environment mode (automatically set by Vercel)

### Frontend
- `VITE_API_URL` - Backend API URL (optional, defaults to `http://localhost:3000/api` in development, `/api` in production)

## Deployment

This project is configured for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel Dashboard](https://vercel.com/dashboard)
3. Vercel will auto-detect the configuration
4. Deploy!

The project includes:
- ✅ Vercel serverless functions for the API (`api/` directory)
- ✅ Frontend build configuration
- ✅ Automatic API URL detection (uses `/api` in production)

