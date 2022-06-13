const router = require('express').Router();
const controllerAuth = require('../controllers/Auth');

router.post('/signup', controllerAuth.signUp)
router.post('/signin', controllerAuth.signIn);

module.exports = router;