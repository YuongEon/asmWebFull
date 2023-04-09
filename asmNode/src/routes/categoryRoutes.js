import express from 'express';
import { checkPermission } from "../middlewares/checkPermission.js";
import { getAll, getOne, createCategory, updateCategory, deleteCategory } from '../controllers/category';
const router = express.Router();

router.get('/categories', getAll);
router.get('/categories/:id', getOne);
router.post('/categories/add', checkPermission, createCategory);
router.patch('/categories/:id', checkPermission, updateCategory);
router.delete('/categories/:id', checkPermission, deleteCategory);

export default router;