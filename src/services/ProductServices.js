const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductSliderModel = require('../models/ProductSliderModel');
const ProductModel = require('../models/ProductModel');
const ProductDetailsModel = require('../models/ProductDetailsModel');
const ProductReviewModel = require('../models/ReviewModel');

// List all brands
const BrandListService = async () => {
    return await BrandModel.find();
};

// List all categories
const CategoryListService = async () => {
    return await CategoryModel.find();
};

// List all product sliders
const SliderListService = async () => {
    return await ProductSliderModel.find();
};

// List all products
const ProductListService = async () => {
    return await ProductModel.find();
};

// List products by brand
const ListByBrandService = async (brandID) => {
    return await ProductModel.find({ brandID });
};

// List products by category
const ListByCategoryService = async (categoryID) => {
    return await ProductModel.find({ categoryID });
};

// List similar products by subcategory
const ListBySimilarService = async (subcategoryID) => {
    return await ProductModel.find({ subcategoryID });
};

// List products by remark
const ListByRemarkService = async (remark) => {
    return await ProductModel.find({ remark });
};

// Search products by keyword in title or short description
const ListByKeywordService = async (keyword) => {
    return await ProductModel.find({
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { shortDes: { $regex: keyword, $options: 'i' } }
        ]
    });
};

// Get product details by product ID
const ProductDetailsListService = async (productID) => {
    return await ProductDetailsModel.findOne({ productID });
};

// Get all reviews for a product
const ProductReviewListService = async (productID) => {
    return await ProductReviewModel.find({ productID });
};

// Post a new product review
const ReviewService = async (data) => {
    return await ProductReviewModel.create(data);
};

module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ProductListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySimilarService,
    ListByRemarkService,
    ListByKeywordService,
    ProductDetailsListService,
    ProductReviewListService,
    ReviewService
};
