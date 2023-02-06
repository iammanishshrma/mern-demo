const express = require("express");

const productControllers = require("../controllers/product");
const HttpError = require("../models/http-error");

const router = express.Router();

router.get("/", productControllers.getProducts);

router.post("/", productControllers.createProduct);

router.delete("/:pid", productControllers.deleteProduct);

router.patch("/:pid", productControllers.updateProductById);

router.use((req, res, next) => {
  const error = new HttpError("Route not found!!!!!", 404);
  return next(error);
});

module.exports = router;
