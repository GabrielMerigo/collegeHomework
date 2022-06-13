const router = require('express').Router();
const controllerProduct = require('../controllers/Product');
const controllerAuth = require('../controllers/Auth');

router.post('/product', controllerAuth.checkToken, controllerProduct.createProduct);
router.get('/product/:id', controllerAuth.checkToken, controllerProduct.getProductById)
router.patch('/product/:id', controllerAuth.checkToken, controllerProduct.updateProduct);
router.delete('/product/:id', controllerAuth.checkToken, controllerProduct.deleteProduct);
router.get('/products', controllerAuth.checkToken, controllerProduct.getProducts)

module.exports = router;