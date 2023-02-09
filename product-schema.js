const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
});

module.exports = mongoose.model("Products", productSchema);
