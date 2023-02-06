const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/product-routes");
const HttpError = require("./models/http-error");

const app = express();
const PORT = 9000;
const url =
  "mongodb+srv://manish:manish@cluster0.pbk8ml0.mongodb.net/products?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((error) => {
    console.log("Some error occured while connecting to database");
  });

app.use(bodyParser.json());

app.use("/products", productRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Route Not found!!!!", 404);
  return next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!!!" });
});

app.listen(PORT, () => {
  console.log("Server running at", PORT);
});
