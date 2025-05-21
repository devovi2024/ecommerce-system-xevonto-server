const ProductServices = require('../services/ProductServices');

// Get all brands
exports.ProductBrandList = async (req, res) => {
  try {
    const data = await ProductServices.BrandListService();
    return res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all categories
exports.ProductCategoryList = async (req, res) => {
  try {
    const data = await ProductServices.CategoryListService();
    return res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all sliders
exports.ProductSliderList = async (req, res) => {
  try {
    const data = await ProductServices.SliderListService();
    return res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all products
exports.ProductList = async (req, res) => {
  try {
    const data = await ProductServices.ProductListService();
    return res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get products by brand ID
exports.ListByBrand = async (req, res) => {
  const brandID = req.params.brandID;
  try {
    const result = await ProductServices.ListByBrandService(brandID);
    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get products by category ID
exports.ListByCategory = async (req, res) => {
  const categoryID = req.params.categoryID;
  try {
    const result = await ProductServices.ListByCategoryService(categoryID);
    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};


// Get similar products by product ID
exports.ProductListBySimiler = async (req, res) => {
  const productID = req.params.productID;
  try {
    const result = await ProductServices.ProductListBySimilerService(productID);
    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};



exports.ProductDetails = async (req, res) => {
  const productID = req.params.productID;

  try {
    const result = await ProductServices.ProductDetailsService(productID);
    if (result.status === 'success') {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};