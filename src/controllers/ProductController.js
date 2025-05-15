const ProductServices = require('../services/ProductServices');

exports.ProductBrandList = async (req, res) => {
    try {
        const brands = await ProductServices.BrandListService();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch brands', error });
    }
};

exports.ProductCategoryList = async (req, res) => {
    try {
        const categories = await ProductServices.CategoryListService();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error });
    }
};

exports.ProductSliderList = async (req, res) => {
    try {
        const sliders = await ProductServices.SliderListService();
        res.json(sliders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch sliders', error });
    }
};

exports.ProductListByBrand = async (req, res) => {
    try {
        const { brandID } = req.params;
        const products = await ProductServices.ListByBrandService(brandID);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products by brand', error });
    }
};

exports.ProductListByCategory = async (req, res) => {
    try {
        const { categoryID } = req.params;
        const products = await ProductServices.ListByCategoryService(categoryID);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products by category', error });
    }
};

exports.ProductListBySimilar = async (req, res) => {
    try {
        const { subcategoryID } = req.params;
        const products = await ProductServices.ListBySimilarService(subcategoryID);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch similar products', error });
    }
};

exports.ProductDetails = async (req, res) => {
    try {
        const { productID } = req.params;
        const details = await ProductServices.ProductDetailsListService(productID);
        if (!details) return res.status(404).json({ message: 'Product details not found' });
        res.json(details);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product details', error });
    }
};

exports.ProductListByKeyword = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) return res.status(400).json({ message: 'Keyword is required' });
        const products = await ProductServices.ListByKeywordService(keyword);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search products', error });
    }
};

exports.ProductListByRemark = async (req, res) => {
    try {
        const { remark } = req.params;
        const products = await ProductServices.ListByRemarkService(remark);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products by remark', error });
    }
};

exports.ProductReviewList = async (req, res) => {
    try {
        const { productID } = req.params;
        const reviews = await ProductServices.ProductReviewListService(productID);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product reviews', error });
    }
};

exports.ProductListBySearch = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) return res.status(400).json({ message: 'Search keyword is required' });
        const products = await ProductServices.ListByKeywordService(keyword);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search products', error });
    }
};
