let mongoose = require("mongoose");
//let dbURI = "mongodb://localhost/todo";
let dbURI = "mongodb://127.0.0.1:27017/todo"

mongoose.connect(dbURI, {
    useNewUrlParser: true
});
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
    console.log("Connection Error : " + error);
});
mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

//memanggil model
require("./todo");