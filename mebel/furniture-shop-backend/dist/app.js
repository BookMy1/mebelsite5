import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Тестовый маршрут
app.get('/api/health', (req, res) => {
    res.json({ message: 'Сервер работает! ✅', timestamp: new Date() });
});
// Обработка ошибок 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});
// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});
export default app;
//# sourceMappingURL=app.js.map