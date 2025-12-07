import Product from "../models/Product.model.js";

export const createProductService = async (data, userId) => {
  const product = await Product.create({ ...data, createdBy: userId });
  return product;
};

export const getAllProductsService = async () => {
  const products = await Product.find();
  return products;
};

export const getProductByIdService = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  return product;
};

export const updateProductService = async (id, data) => {
  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new Error("Product not found");
  return updated;
};

export const deleteProductService = async (id) => {
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) throw new Error("Product not found");
  return deleted;
};
