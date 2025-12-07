import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService
} from "../services/product.service.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await createProductService(req.body, req.user.id);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductByIdService(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updated = await updateProductService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await deleteProductService(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
