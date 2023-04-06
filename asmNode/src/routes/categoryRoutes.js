import express from 'express';
import { getAll, getOne, createCategory, updateCategory, deleteCategory } from '../controllers/category';
const router = express.Router();

router.get('/categories', getAll);
router.get('/categories/:id', getOne);
router.post('/categories/add', createCategory);
router.patch('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export default router;