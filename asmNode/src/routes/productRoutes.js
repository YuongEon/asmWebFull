import express from 'express';
import { checkPermission } from "../middlewares/checkPermission.js";
import { createProduct, deleteProduct, getAll, getOne, updateProduct } from '../controllers/product.js';

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getOne);
router.post('/products/add',checkPermission, createProduct);
router.patch('/products/:id',checkPermission, updateProduct);
router.delete('/products/:id',checkPermission, deleteProduct);

export default router;