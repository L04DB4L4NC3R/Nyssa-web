const mongoose = require('mongoose');
var mongoURL = require("../secret/secret").mongoURL;

mongoose.connect(mongoURL);

mongoose.connection.once("open",()=>{
    console.log("connected to database");
}).on("error",(error)=>{
    console.log("error");
});
