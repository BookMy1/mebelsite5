import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый маршрут
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Сервер работает! ✅', timestamp: new Date() });
});

// Обработка ошибок 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Обработка ошибок
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

export default app;
