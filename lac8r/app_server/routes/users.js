var express = require('express');
var router = express.Router();
/*const {
    expressjwt: jwt
} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
})*/
const ctrlAuth = require('../controllers/authentication');
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
