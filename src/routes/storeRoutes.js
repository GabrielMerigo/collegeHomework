const router = require('express').Router();
const controllerStore = require('../controllers/Store');
const controllerAuth = require('../controllers/Auth');

router.post('/store', controllerAuth.checkToken, controllerStore.createStore);
router.get('/store/:id', controllerAuth.checkToken, controllerStore.getStoreById)
router.patch('/store/:id', controllerAuth.checkToken, controllerStore.updateStore);
router.delete('/store/:id', controllerAuth.checkToken, controllerStore.deleteStore);
router.get('/stores', controllerAuth.checkToken, controllerStore.getStores)

module.exports = router;