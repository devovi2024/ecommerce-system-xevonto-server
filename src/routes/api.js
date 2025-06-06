// const express = require('express');
// const router = express.Router();
// const ProductController = require('../controllers/ProductController');

// router.get('/brand-list', ProductController.ProductBrandList);

// router.get('/category-list', ProductController.ProductCategoryList);

// router.get('/sliders-list', ProductController.ProductSliderList);

// router.get('/products/brand/:brandID', ProductController.ProductListByBrand);

// router.get('/products/category/:categoryID', ProductController.ProductListByCategory);

// router.get('/products/similar/:subcategoryID', ProductController.ProductListBySimilar);

// router.get('/products/remark/:remark', ProductController.ProductListByRemark);

// router.get('/products/keyword/:keyword', ProductController.ProductListByKeyword);

// router.get('/products/details/:productID', ProductController.ProductDetails);

// router.get('/products/reviews/:productID', ProductController.ProductReviewList);

// // Add your search route handler if implemented

// // router.get('/products/search', ProductController.ProductListBySearch);

// module.exports = router;


const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/brand-list', ProductController.ProductBrandList);
router.get('/category-list', ProductController.ProductCategoryList);
router.get('/sliders-list', ProductController.ProductSliderList);
router.get('/all-products', ProductController.ProductList);
router.get('/brand/:brandID', ProductController.ListByBrand);
router.get('/category/:categoryID', ProductController.ListByCategory),
router.get('/products/similar/:productID', ProductController.ProductListBySimiler);
router.get('/product-details/:productID', ProductController.ProductDetails);


module.exports = router;
