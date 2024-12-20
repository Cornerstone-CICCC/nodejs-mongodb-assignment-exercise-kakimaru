"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_model_1.Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to get all products" });
    }
});
// get product by id
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to get product by id" });
    }
});
// add new product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield product_model_1.Product.create(req.body);
        res.status(200).json(newProduct);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Unable to add new product" });
    }
});
// update product by id
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedProduct) {
            res.status(404).json({ error: "Something wrong with updating" });
            return;
        }
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to update product" });
    }
});
// delete product by id
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedProduct = yield product_model_1.Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ error: "The product not found" });
            return;
        }
        res.status(200).json({ message: "The product successfully deleted" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to delete product" });
    }
});
exports.default = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};
