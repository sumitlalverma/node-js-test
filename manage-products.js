const productModel = require('./product-schema');

const addProduct = async (data) => {
  const product = new productModel(data);
  return await product.save();
};

const addQuantityInProduct = async (productId, quantity) => {
  const product = await productModel.updateOne({
    _id: productId,
    $inc: { quantity: quantity },
  });

  return product;
};

const subtractQuantityInProduct = async (productId, quantity) => {
  const product = await productModel.updateOne(
    {
      _id: productId,
    },
    { $inc: { quantity: -quantity } }
  );

  return product;
};

module.exports = {
  addProduct,
  addQuantityInProduct,
  subtractQuantityInProduct,
};
