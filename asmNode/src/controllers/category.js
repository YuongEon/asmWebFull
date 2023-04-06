import joi from "joi";
import Category from "../models/categoryModel";

const categorySchema = joi.object({
  name: joi.string().required(),
  products: joi.array().default([])
});

const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.json({
        message: "Khong co danh muc nao",
      });
    }
    res.json(categories);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getOne = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.json({
        message: "Danh muc khong ton tai",
      });
    }
    res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return  res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const newCategory = await Category.create(req.body);
    if (!newCategory) {
      return  res.status(400).json({
        message: "Khong them duoc danh muc",
      });
    }
    return res.status(201).json({
      message: "Tao danh muc thanh cong",
      data: newCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const updateCategory = async(req, res) => {
  try {
    const categoryUpdate = await Category.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
    if(!categoryUpdate){
      return  res.status(400).json({
        message: "Cap nhat khong thanh cong"
      })
    }
    return res.status(200).json({
      message: "Cap nhat thanh cong",
      data: categoryUpdate
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

const deleteCategory = async(req, res) => {
  try {
    const categoryId = req.params.id
    const categoryDelete = await Category.findById(categoryId).populate("products")
    if(!categoryDelete){
      return  res.status(400).json({
        message: 'Xoa that bai'
      })
    }
    const productsId = await categoryDelete?.products?.map((product) => product._id);
    if(productsId.length > 0){
      return res.status(400).json({
        message: "Danh mục vẫn còn chứa sản phẩm nên không thể xoá"
      })
    }
    return res.status(200).json({
      message: "Xoa thanh cong",
      data: categoryDelete
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export {getAll, getOne, createCategory, updateCategory, deleteCategory}