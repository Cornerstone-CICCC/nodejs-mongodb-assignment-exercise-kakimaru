import { Request, Response } from "express";
import { IProduct, Product } from "../models/product.model";

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get all products" });
  }
};

// get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "The product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to get product by id" });
  }
};

// add new product
const addProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to add new product" });
  }
};

// update product by id
const updateProductById = async (
  req: Request<{ id: string }, {}, Partial<IProduct>>,
  res: Response
) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProduct) {
      res.status(404).json({ error: "Something wrong with updating" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update product" });
  }
};

// delete product by id
const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ error: "The product not found" });
      return;
    }
    res.status(200).json({ message: "The product successfully deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
