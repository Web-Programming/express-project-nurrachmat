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
            success: false,
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

//untuk menghandle request update todo
const update = (req, res, next) => {

     Todo
        .findByIdAndUpdate(req.params.id, {text: req.body.text})
        .then((todo) => {
            Todo
            .findById(req.params.id)
            .then((todo) =>{
                const responseMessage = {
                    code: 200,
                    success: true,
                    message: "Successfull",
                    data: todo
                };
                res.status(200).json(responseMessage);
            })
            /*const responseMessage = {
                code: 200,
                success: true,
                message: "Successfully updated",
                data: todo
            };
            res.status(200).json(responseMessage);     */           
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
                error: e
            };
            res.status(404).json(responseMessage);
        });
    /*Todo
        .findById(req.params.id)
        .then((todo) => {
            todo.text =  req.body.text; //set field / property yg ingin di update 
            todo
                .save()      //panggil .save() untuk menyimpan    
                .then((result) => {
                    const responseMessage = {
                        code: 200,
                        success: true,
                        message: "Successfully updated",
                        data: result
                    };
                    res.status(200).json(responseMessage);
                })
                .catch((e) => {
                    const responseMessage = {
                        code: 400,
                        success: false,
                        message: "Update failed"
                    };
                    res.status(400).json(responseMessage);
                });
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
                error: e
            };
            res.status(404).json(responseMessage);
        });*/
};


//untuk menghandle request show detail
const show = (req, res, next) => {
    Todo
        .findById(req.params.id)
        .then((todo) =>{
            const responseMessage = {
                code: 200,
                success: true,
                message: "Successfull",
                data: todo
            };
            res.status(200).json(responseMessage);
        })
        .catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
            };
            res.status(404).json(responseMessage);
        });
};


//untuk menghandle request delete
const destroy = (req, res, next) => {
    Todo
        .findByIdAndDelete(req.params.id)
        .then((todo) => {
            const responseMessage = {
                code: 200,
                success: true,
                message: "Delete Successfull",
            };
            res.status(200).json(responseMessage);
        });
        /*.catch((e) => {
            const responseMessage = {
                code: 404,
                success: false,
                message: "ID " + req.params.id + " Not Found",
                error: e
            };
            res.status(404).json(responseMessage);
        });*/
};

module.exports = {
    index, insert, update, show, destroy
}