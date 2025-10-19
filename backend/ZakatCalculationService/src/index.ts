import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'Zakat Calculation Service' });
});

// API Routes
app.post('/api/v1/zakat/calculate', (req: Request, res: Response) => {
  res.json({ message: 'Zakat Calculation API - Calculate zakat' });
});

app.get('/api/v1/zakat/nisab', (req: Request, res: Response) => {
  res.json({ message: 'Zakat Calculation API - Get nisab threshold' });
});

app.post('/api/v1/zakat/batch-calculate', (req: Request, res: Response) => {
  res.json({ message: 'Zakat Calculation API - Batch calculate' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[Zakat Calculation Service]: Server is running at http://localhost:${port}`);
});

export default app;
