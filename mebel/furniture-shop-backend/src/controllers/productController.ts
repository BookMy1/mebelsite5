import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { skip = 0, take = 10, categoryId } = req.query;
    const where = categoryId ? { categoryId: String(categoryId) } : {};
    
    const products = await prisma.product.findMany({
      where,
      skip: Number(skip),
      take: Number(take),
      include: { images: true, category: true }
    });
    
    const total = await prisma.product.count({ where });
    res.json({ products, total, skip: Number(skip), take: Number(take) });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при выборке товаров' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { images: true, reviews: { include: { user: true } }, category: true }
    });
    
    if (!product) return res.status(404).json({ error: 'Продукт не найден' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categoryId, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, categoryId, stock }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании товара' });
  }
};
