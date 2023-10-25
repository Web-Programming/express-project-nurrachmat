var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todo');

router.get('/', todoController.index);  //list todos
router.post('/insert', todoController.insert);  //insert todos
router.put('/update/:id', todoController.update);  //mengupdate todos
router.get('/show/:id', todoController.show);  //show detail todos by id
router.delete('/delete/:id', todoController.destroy) //delete todos by id

module.exports = router;