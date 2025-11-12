import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ message: 'Сервер работает!', timestamp: new Date() });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

export default app;

