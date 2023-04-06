import joi from "joi";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  quantity: joi.number().required(),
  image: joi.string(),
  description: joi.string(),
  categoryId: joi.string().required(),
});

const getAll = async (req, res) => {
  const {
    _sort = "createAt",
    _order = "asc",
    _limit = 10,
    _page = 1,
    keyword
  } = req.query;

  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };

  const searchData = (data) => {
    const {docs} = data
    return docs?.filter((item) => item.name.toLowerCase().includes(keyword))
  }

  try {
    const products = await Product.paginate({}, options);
    if (products.length === 0 || products.docs.length === 0) {
      return res.status(400).json({
        message: "Khong co san pham nao",
      });
    }

    let searchDataProduct = await searchData(products)
    let productExport = await {...products, docs: searchDataProduct}

    return res.json(productExport);
    
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId).populate(
      "categoryId"
    );
    if (!product) {
      return res.status(400).json({
        message: "San pham khong ton tai",
      });
    }
    return res.json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details.map(err => err.message),
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.status(400).json({
        message: "Khong them san pham",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });
    return res.status(201).json({
      message: "Them san pham thanh cong",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    // Lấy category cũ
    const oldData = await Product.findById({ _id: req.params.id });
    const oldCategory = await oldData.categoryId;
    const newCategory = req.body.categoryId;

    const productUpdate = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
    );

    if(!productUpdate){
      return res.status(400).json({
        message: "Sam pham khong cap nhat thanh cong"
      })
    }

    // xoá sp ở category cũ
    await Category.findByIdAndUpdate(
      {_id: oldCategory},
      { $pull: {products: productUpdate._id}},
      {new: true}
    )
    // thêm sp vào category mới
    await Category.findByIdAndUpdate(
      {_id: newCategory},
      { $addToSet: {products: productUpdate._id}},
      {new: true}
    )
    res.status(200).json(productUpdate)
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productDelete = await Product.findByIdAndDelete({ _id: req.params.id })
    if(!productDelete){
      return res.status(400).json({
        message: "xoa san pham that bai"
      })
    }
    // xoá sản phẩm trong category
    await Category.findByIdAndUpdate(
      {_id: productDelete.categoryId},
      { $pull: {products: productDelete._id}},
      {new: true}
    )

    return res.status(200).json({
      message: "Xoa san pham thanh cong",
      data: productDelete
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export { getAll, getOne, createProduct, updateProduct, deleteProduct };
