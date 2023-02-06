const Product = require("../models/Product");

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  console.log(products);
  res.json({ products });
};

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();
  res.json(result);
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.pid;

  const result = await Product.deleteOne({ _id: productId });

  res.json({ message: "Product deleted" });
};

const updateProductById = async (req, res, next) => {
  const productId = req.params.pid;

  const result = await Product.updateOne({ _id: productId }, { price: 124999 });
  res.json({ message: "Product updated" });
};

exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.deleteProduct = deleteProduct;
exports.updateProductById = updateProductById;
