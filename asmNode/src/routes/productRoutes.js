import express from 'express';
import { createProduct, deleteProduct, getAll, getOne, updateProduct } from '../controllers/product.js';

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getOne);
router.post('/products/add', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;