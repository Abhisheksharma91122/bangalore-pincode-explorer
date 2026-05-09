# Bangalore Pincode Explorer

A full-stack web application to search and explore pincodes in Bangalore. Built with a modern tech stack and premium UI design.

## Features
- **Instant Search**: Search by area name or exact pincode.
- **Premium UI**: Glassmorphism, animations with Framer Motion, Dark/Light mode.
- **Map Integration**: OpenStreetMap linking.
- **Copy & Share**: Easily share pincode details.
- **Responsive**: Mobile-first design.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Axios, Lucide React.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose).

## Local Development

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone & Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=your_mongodb_atlas_uri_here
```

Seed the database with sample Bangalore data:
```bash
npm run seed
```

Start the backend development server:
```bash
npm run dev
```

### 2. Setup Frontend
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend/` directory (optional):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The app will be running at `http://localhost:3000`.

## Deployment Instructions

### Deploying the Backend (Render / Railway)
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com) or [Railway](https://railway.app).
3. Create a new **Web Service** and connect your GitHub repository.
4. Set the Root Directory to `backend`.
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add Environment Variables:
   - `MONGODB_URI`: Your Atlas connection string
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: URL of your deployed frontend
8. Deploy.

### Deploying the Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set the Root Directory to `frontend`.
3. Framework Preset: Next.js.
4. Build Command: `npm run build`
5. Install Command: `npm install`
6. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com/api`)
7. Deploy.
