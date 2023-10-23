const mongoose = require("mongoose");
const Todo = mongoose.model("Todo");
//untuk menghandle request get all todos
const index = (req, res, next) => {
    Todo.find({}, { __v: 0 })
      .then((todos) => {
        const responseMessage = {
            code: 200,
            success: true,
            message: "Successfully completed",
            data: todos
        };
        res.status(200).json(responseMessage);
      })
      .catch((e) => {
        const responseMessage = {
            code: 400,
            success: true,
            message: "Bad request."
        };
        res.status(400).json(responseMessage);
      });
};

//untuk menghandle request insert todos
const insert = (req, res, next) => {
    const todo = new Todo({
        text: req.body.text,
    });
    todo
        .save()
        .then((result) => {
            const responseMessage = {
                code: 200,
                success: true,
                message: "Successfully completed",
                data: result
            };
            res.status(200).json(responseMessage);
        })
        .catch((e) => {
            const responseMessage = {
                code: 400,
                success: true,
                message: "Bad request."
            };
            res.status(400).json(responseMessage);
        });
};

module.exports = {
    index, insert
}