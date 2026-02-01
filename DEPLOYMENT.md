# Vercel Deployment Guide

This guide will help you deploy both the frontend and backend to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for CLI deployment)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Project Structure

```
SlackAttend/
├── api/              # Vercel serverless functions (used for both local dev and production)
│   ├── health.ts     # Health check endpoint
│   └── index.ts      # Root API endpoint
├── frontend/         # React frontend application
├── vercel.json       # Vercel configuration
└── package.json      # Root dependencies
```

**Note**: We use Vercel serverless functions for both local development and production. The Express server (`src/index.ts`) has been removed to avoid duplication.

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Root Directory**: Leave as default (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install` (in root) and `cd frontend && npm install`

4. **Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_URL` if you want to override the default API URL
   - For production, you can leave it empty (it will use `/api` automatically)

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not installed)
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **For Production Deployment**
   ```bash
   vercel --prod
   ```

## API Endpoints

After deployment, your API endpoints will be available at:
- `https://your-project.vercel.app/api/health` - Health check endpoint
- `https://your-project.vercel.app/api` - Root API endpoint

## Frontend

The frontend will be served at:
- `https://your-project.vercel.app/`

The frontend automatically detects the production environment and uses `/api` as the API URL.

## Environment Variables

### Frontend Environment Variables
- `VITE_API_URL` - Override the API URL (optional, defaults to `/api` in production)

### Backend Environment Variables
- `NODE_ENV` - Automatically set by Vercel (production)

## Local Development

For local development, use Vercel's dev server which runs both API and frontend:

1. **Install Vercel CLI** (if not installed):
   ```bash
   npm i -g vercel
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```
   
   This will start:
   - API serverless functions on `http://localhost:3000/api`
   - Frontend on `http://localhost:3001` (if configured)

3. **Or run frontend separately** (for faster frontend development):
   ```bash
   npm run dev:frontend
   ```

## Troubleshooting

### Build Fails
- Ensure all dependencies are listed in `package.json` files
- Check that TypeScript compiles without errors
- Verify `vercel.json` configuration is correct

### API Routes Not Working
- Ensure API functions are in the `api/` directory
- Check that `@vercel/node` is installed
- Verify the routes in `vercel.json` are correct

### Frontend Can't Connect to API
- In production, the frontend uses `/api` automatically
- Check browser console for CORS errors
- Verify the API endpoints are deployed correctly

## Notes

- Vercel automatically handles CORS for serverless functions
- The frontend build is optimized for production
- API functions are serverless and scale automatically
- Each deployment gets a unique URL for preview

