import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'Asset Management Service' });
});

// API Routes
app.get('/api/v1/assets', (req: Request, res: Response) => {
  res.json({ message: 'Asset Management API - Get all assets' });
});

app.post('/api/v1/assets', (req: Request, res: Response) => {
  res.json({ message: 'Asset Management API - Create asset' });
});

app.get('/api/v1/assets/:id', (req: Request, res: Response) => {
  res.json({ message: `Asset Management API - Get asset ${req.params.id}` });
});

app.put('/api/v1/assets/:id', (req: Request, res: Response) => {
  res.json({ message: `Asset Management API - Update asset ${req.params.id}` });
});

app.delete('/api/v1/assets/:id', (req: Request, res: Response) => {
  res.json({ message: `Asset Management API - Delete asset ${req.params.id}` });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[Asset Management Service]: Server is running at http://localhost:${port}`);
});

export default app;
