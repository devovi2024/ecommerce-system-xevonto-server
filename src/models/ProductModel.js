const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  shortDes: String,
  longDes: String,
  price: Number,
  discount: Boolean,
  discountPrice: Number,
  image: String,
  star: Number,
  stock: Number,
  remark: String,
  brandID: { type: mongoose.Schema.Types.ObjectId, ref: 'brands' },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
