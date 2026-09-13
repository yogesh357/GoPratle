import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import requirementRoutes from './routes/requirementRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { connectDB } from './config/db';
import mongoose from 'mongoose';

const app: Application = express();

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      // In development or if origin matches frontend port, allow
      if (
        process.env.NODE_ENV !== 'production' ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.includes('vercel.app') ||
        origin === process.env.CORS_ORIGIN
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for assignment demo
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[DB Middleware] Connection failed:', err);
    res.status(500).json({
      success: false,
      message: 'Database connection failed.',
    });
  }
});
app.get('/api/health', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'healthy',
    database: isDbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    service: 'GoPratle Requirement Posting API',
  });
});

// API Routes
app.use('/api/requirements', requirementRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
