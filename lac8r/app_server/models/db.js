let mongoose = require("mongoose");
let dbURI = "mongodb+srv://paw2:paw2mdp@paw2.iendmj6.mongodb.net/todo?retryWrites=true&w=majority";   //jika menggunakan mongdb online 
//let dbURI = "mongodb://127.0.0.1:27017/todo"  //jika menggunakan mongo db local
//let dbURI = "mongodb://mongo:27017/todo" //jika menggunakan docker

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
require("./user");