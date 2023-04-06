import { Category } from "../types/categoryType";
import { IProduct } from "../types/products";
import instance from "./instance";

export {};

const getAllCategory = () => {
  return instance.get("/categories");
};

const getOneCategory = (id: any) => {
  return instance.get(`/categories/${id}`);
};

const createCategory = (category: Category) => {
  return instance.post("/categories/add", category);
};

const updateCategory = (id: any, category: Category) => {
  return instance.patch(`/categories/${id}`, category);
};

const deleteCategory = (id: any) => {
  return instance.delete(`/categories/${id}`);
};

export {
  getAllCategory,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};


export{}