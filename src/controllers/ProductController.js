const ProductServices = require('../services/ProductServices');

// Get all brands
exports.ProductBrandList = async (req, res) => {
  try {
    const data = await ProductServices.BrandListService();
    res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all categories
exports.ProductCategoryList = async (req, res) => {
  try {
    const data = await ProductServices.CategoryListService();
    res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all sliders
exports.ProductSliderList = async (req, res) => {
  try {
    const data = await ProductServices.SliderListService();
    res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all products
exports.ProductList = async (req, res) => {
  try {
    const data = await ProductServices.ProductListService();
    res.status(data.status === 'error' ? 500 : 200).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get products by brand ID
exports.ListByBrand = async (req, res) => {
  const brandID = req.params.brandID;

  try {
    const result = await ProductServices.ListByBrandService(brandID);

    if (result.status === 'success') {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
