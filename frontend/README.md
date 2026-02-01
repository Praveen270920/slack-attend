# SlackAttend Frontend

React + TypeScript frontend application with Tailwind CSS for monitoring backend health status.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on **http://localhost:3001**

## Build

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

Create a `.env` file in the frontend directory to override:
```
VITE_API_URL=http://localhost:3000
```

## Features

- Health status monitoring
- Manual refresh button
- Error handling with retry functionality
- Responsive, modern UI built with Tailwind CSS

