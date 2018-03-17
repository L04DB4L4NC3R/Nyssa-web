const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/nyssa");

mongoose.connection.once("open",()=>{
    console.log("connected to database");
}).on("error",(error)=>{
    console.log("error");
});
