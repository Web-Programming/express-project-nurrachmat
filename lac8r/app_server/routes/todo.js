var express = require('express');
var router = express.Router();

//create middleware
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
})
const todoController = require('../controllers/todo');

router.get('/', todoController.index);  //list todos
router.route('/insert')
    .post(auth, todoController.insert);  //insert todos
router.put('/update/:id', todoController.update);  //mengupdate todos
router.get('/show/:id', todoController.show);  //show detail todos by id
router.route('/delete/:id')
    .delete(auth, todoController.destroy) //delete todos by id
  
module.exports = router;