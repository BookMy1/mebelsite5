import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Сервер работает!', timestamp: new Date() });
});

// 404 - если ничего не найдено
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработчик ошибок
app.use(errorHandler);

export default app;
