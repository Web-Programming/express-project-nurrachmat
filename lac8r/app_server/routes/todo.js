var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todo');

router.get('/', todoController.index);  //list todos
router.post('/insert', todoController.insert);  //insert todos

module.exports = router;