import { Router } from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/productController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, adminMiddleware, createProduct);

export default router;
