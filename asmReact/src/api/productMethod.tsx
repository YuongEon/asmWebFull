import { IProduct } from "../types/products";
import instance from "./instance";

export {};

const getAllProduct = (options: {[key: string]: any}) => {
  return instance.get(`/products?keyword=${options?.keyword}&_page=${options?._page}&_limit=${options?._limit}`);
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
