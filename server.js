const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  addProduct,
  addQuantityInProduct,
  subtractQuantityInProduct,
} = require("./manage-products");

mongoose.connect(
  "mongodb://localhost:27017/node-test?authSource=admin&ssl=false"
);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(`Error in connection database ==>`, error);
});

database.once("connected", (error) => {
  console.log(`Database Connected`);
});

const PORT = 8080;
const app = express();

app.use(bodyParser.json());

// for creating new products.
app.post("/add-products", async (req, res) => {
  try {
    await addProduct(req.body);
    res.send("Product created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// for updating quantity.
app.post("/products", async (req, res) => {
  const products = req.body;
  if (products.length > 0) {
    try {
      await Promise.all(
        products.map(({ operation, productId, quantity }) => {
          if (operation === "add") {
            return addQuantityInProduct(productId, quantity);
          }
          if (operation === "subtract") {
            return subtractQuantityInProduct(productId, quantity);
          }
        })
      );
      res.send("Product updated successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
