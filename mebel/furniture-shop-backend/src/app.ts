import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';

// Импорт маршрутов для товаров
import productRoutes from './routes/productRoutes';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Подключаем маршрут для товаров
app.use('/api/products', productRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Сервер работает!', timestamp: new Date() });
});

// Маршрут 404 — если ничего не найдено
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный обработчик ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

export default app;
