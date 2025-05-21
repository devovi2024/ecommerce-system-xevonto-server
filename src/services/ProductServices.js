const BrandModel = require('../models/BrandModel');
const CategoryModel = require('../models/CategoryModel');
const SliderModel = require('../models/ProductSliderModel');
const ProductModel = require('../models/ProductModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Get all brands
const BrandListService = async () => {
  try {
    const brands = await BrandModel.find({});
    return { status: 'success', data: brands };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Get all categories
const CategoryListService = async () => {
  try {
    const categories = await CategoryModel.find({});
    return { status: 'success', data: categories };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Get all sliders
const SliderListService = async () => {
  try {
    const sliders = await SliderModel.find({});
    return { status: 'success', data: sliders };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Get all products
const ProductListService = async () => {
  try {
    const products = await ProductModel.find({});
    return { status: 'success', data: products };
  } catch (error) {
    return {
      status: 'error',
      message: 'Failed to fetch products',
      error: error.message || String(error),
    };
  }
};

const ListByBrandService = async (brandIDStr) => {
  try {
    if (!brandIDStr || !ObjectId.isValid(brandIDStr)) {
      throw new Error('Invalid brandID parameter');
    }

    const brandID = new ObjectId(brandIDStr);

    const data = await ProductModel.aggregate([
      {
        $addFields: {
          brandIDObj: { $toObjectId: "$brandID" },
          categoryIDObj: { $toObjectId: "$categoryID" }
        }
      },
      { $match: { brandIDObj: brandID } },
      {
        $lookup: {
          from: 'brands',
          localField: 'brandIDObj',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryIDObj',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          price: 1,
          shortDes: 1,
          discount: 1,
          discountPrice: 1,
          image: 1,
          star: 1,
          stock: 1,
          remark: 1,
          'brand.name': 1,
          'category.name': 1,
        },
      },
    ]);

    return { status: 'success', data };
  } catch (error) {
    console.error('Error in ListByBrandService:', error);
    return {
      status: 'error',
      message: 'Failed to fetch products by brand',
      error: error.message || 'Unknown error',
    };
  }
};


const ListByCategoryService = async (categoryIDStr) => {
  try {
    if (!categoryIDStr || !ObjectId.isValid(categoryIDStr)) {
      throw new Error('Invalid categoryID parameter');
    }

    const categoryID = new ObjectId(categoryIDStr);

    const data = await ProductModel.aggregate([
      {
        $match: { categoryID: categoryID }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brandID',
          foreignField: '_id',
          as: 'brand'
        }
      },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          price: 1,
          shortDes: 1,
          discount: 1,
          discountPrice: 1,
          image: 1,
          star: 1,
          stock: 1,
          remark: 1,
          'brand.name': 1,
          'category.categoryName': 1
        }
      }
    ]);

    return { status: 'success', data };
  } catch (error) {
    console.error('Error in ListByCategoryService:', error);
    return {
      status: 'error',
      message: 'Failed to fetch products by category',
      error: error.message || 'Unknown error'
    };
  }
};
const ProductListBySimilerService = async (productIDStr) => {
  try {
    if (!productIDStr || !ObjectId.isValid(productIDStr)) {
      throw new Error('Invalid productID parameter');
    }

    const productID = new ObjectId(productIDStr);

    // Step 1: Find the product to get its categoryID
    const targetProduct = await ProductModel.findById(productID);
    if (!targetProduct) {
      throw new Error('Product not found');
    }

    const categoryID = targetProduct.categoryID;

    // Step 2: Find other products with the same categoryID (excluding the current product)
    const data = await ProductModel.aggregate([
      {
        $match: {
          categoryID: categoryID,
          _id: { $ne: productID }
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brandID',
          foreignField: '_id',
          as: 'brand'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category'
        }
      },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          price: 1,
          shortDes: 1,
          discount: 1,
          discountPrice: 1,
          image: 1,
          star: 1,
          stock: 1,
          remark: 1,
          'brand.name': 1,
          'category.categoryName': 1
        }
      }
    ]);

    return { status: 'success', data };
  } catch (error) {
    console.error('Error in ProductListBySimilerService:', error);
    return {
      status: 'error',
      message: 'Failed to fetch similar products',
      error: error.message || 'Unknown error'
    };
  }
};





const ProductDetailsService = async (productIDStr) => {
  try {
    if (!productIDStr || !ObjectId.isValid(productIDStr)) {
      throw new Error('Invalid productID parameter');
    }

    const productID = new ObjectId(productIDStr);

    const data = await ProductModel.aggregate([
      { $match: { _id: productID } },
      {
        $lookup: {
          from: 'brands',
          localField: 'brandID',
          foreignField: '_id',
          as: 'brand',
        },
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryID',
          foreignField: '_id',
          as: 'category',
        },
      },
      { $unwind: { path: '$brand', preserveNullAndEmptyArrays: true } },
      { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          title: 1,
          shortDes: 1,
          longDes: 1,
          price: 1,
          discount: 1,
          discountPrice: 1,
          image: 1,
          star: 1,
          stock: 1,
          remark: 1,
          'brand.name': 1,
          'category.name': 1,
        },
      },
    ]);

    return { status: 'success', data: data[0] || null };
  } catch (error) {
    console.error('Error in ProductDetailsService:', error);
    return {
      status: 'error',
      message: 'Failed to fetch product details',
      error: error.message || 'Unknown error',
    };
  }
};



module.exports = {
  BrandListService,
  CategoryListService,
  SliderListService,
  ProductListService,
  ListByBrandService,
  ListByCategoryService,
  ProductListBySimilerService,
  ProductDetailsService
};
