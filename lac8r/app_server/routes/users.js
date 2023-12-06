var express = require('express');
var router = express.Router();

const ctrlAuth = require('../controllers/authentication');
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
