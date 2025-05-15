const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const ProductSliderModel = require('../models/ProductSliderModel');
const ProductModel = require('../models/ProductModel');
const ProductDetailsModel = require('../models/ProductDetailsModel');
const ProductReviewModel = require('../models/ReviewModel');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;  // Destructure for clarity




// List all brands
const BrandListService = async () => {
    try {
        const data = await BrandModel.find();
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching brands:", error);
        return { status: 'error', message: 'Failed to fetch brands', error: error.message || String(error) };
    }
};

// List all categories
const CategoryListService = async () => {
    try {
        const data = await CategoryModel.find();
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { status: 'error', message: 'Failed to fetch categories', error: error.message || String(error) };
    }
};

// List all product sliders
const SliderListService = async () => {
    try {
        const data = await ProductSliderModel.find();
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return { status: 'error', message: 'Failed to fetch sliders', error: error.message || String(error) };
    }
};




// List products by brand
const ListByBrandService = async (req) => {
    try {
        const brandIDStr = req.params.brandID;
        console.log('brandID param:', brandIDStr);

        if (!brandIDStr || !ObjectId.isValid(brandIDStr)) {
            throw new Error('Invalid brandID parameter');
        }

        const brandID = new ObjectId(brandIDStr);

        const MatchStage = { $match: { brandID } };
        const JoinWithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'brandID',
                foreignField: '_id',
                as: 'brand'
            }
        };
        const JoinWithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
            }
        };
        const UnwindBrandStage = { $unwind: '$brand' };
        const UnwindCategoryStage = { $unwind: '$category' };
        const ProjectionStage = { $project: { brandID: 0, categoryID: 0 } };

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching products by brand:", error);
        return {
            status: 'error',
            message: 'Failed to fetch products by brand',
            error: error.message || String(error) || 'Unknown error'
        };
    }
};

const ListByCategoryService = async (req) => {
    try {
        const categoryIDStr = req.params.categoryID;
        console.log('categoryID param:', categoryIDStr);

        if (!categoryIDStr || !ObjectId.isValid(categoryIDStr)) {
            throw new Error('Invalid categoryID parameter');
        }

        const categoryID = new ObjectId(categoryIDStr);

        const MatchStage = { $match: { categoryID } };
        const JoinWithBrandStage = {
            $lookup: {
                from: 'brands',
                localField: 'brandID',
                foreignField: '_id',
                as: 'brand'
            }
        };
        const JoinWithCategoryStage = {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
            }
        };
        const UnwindBrandStage = { $unwind: '$brand' };
        const UnwindCategoryStage = { $unwind: '$category' };
        const ProjectionStage = { $project: { brandID: 0, categoryID: 0 } };

        const data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            ProjectionStage
        ]);

        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return {
            status: 'error',
            message: 'Failed to fetch products by category',
            error: error.message || String(error) || 'Unknown error'
        };
    }
};

// List similar products by subcategory
const ListBySimilarService = async (subcategoryID) => {
    try {
        const data = await ProductModel.find({ subcategoryID });
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching similar products:", error);
        return { status: 'error', message: 'Failed to fetch similar products', error: error.message || String(error) };
    }
};








// List all products
const ProductListService = async () => {
    try {
        const data = await ProductModel.find();
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { status: 'error', message: 'Failed to fetch products', error: error.message || String(error) };
    }
};



// List products by remark
const ListByRemarkService = async (remark) => {
    try {
        const data = await ProductModel.find({ remark });
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching products by remark:", error);
        return { status: 'error', message: 'Failed to fetch products by remark', error: error.message || String(error) };
    }
};

// Search products by keyword in title or short description
const ListByKeywordService = async (keyword) => {
    try {
        const data = await ProductModel.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { shortDes: { $regex: keyword, $options: 'i' } }
            ]
        });
        return { status: 'success', data };
    } catch (error) {
        console.error("Error searching products:", error);
        return { status: 'error', message: 'Failed to search products', error: error.message || String(error) };
    }
};

// Get product details by product ID
const ProductDetailsListService = async (productID) => {
    try {
        const data = await ProductDetailsModel.findOne({ productID });
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching product details:", error);
        return { status: 'error', message: 'Failed to fetch product details', error: error.message || String(error) };
    }
};

// Get all reviews for a product
const ProductReviewListService = async (productID) => {
    try {
        const data = await ProductReviewModel.find({ productID });
        return { status: 'success', data };
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return { status: 'error', message: 'Failed to fetch product reviews', error: error.message || String(error) };
    }
};

// Post a new product review
const ReviewService = async (data) => {
    try {
        const result = await ProductReviewModel.create(data);
        return { status: 'success', data: result };
    } catch (error) {
        console.error("Error posting review:", error);
        return { status: 'error', message: 'Failed to post review', error: error.message || String(error) };
    }
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
