import { IProduct } from "../types/products";
import instance from "./instance";

export {};

const getAllProduct = (keyword: string) => {
  return instance.get(`/products?keyword=${keyword}`);
};

const getOneProduct = (id: any) => {
  return instance.get(`/products/${id}`);
};

const createProduct = (product: IProduct) => {
  return instance.post("/products/add", product);
};

const updateProduct = (id: any ,product: IProduct) => {
  return instance.patch(`/products/${id}`, product);
};

const deleteProduct = (id: any) => {
  return instance.delete(`/products/${id}`);
};

export {
  getAllProduct,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
