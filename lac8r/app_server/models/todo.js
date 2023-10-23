let mongoose = require("mongoose");

//https://mongoosejs.com/docs/schematypes.html
//create Schema
let schemaTodo = new mongoose.Schema({
    text : {
        type : String,
        require: true
    },
    tanggal: {
        type: Date
    },
    status: Number,
})

//create Model from Schema
mongoose.model('Todo', schemaTodo);