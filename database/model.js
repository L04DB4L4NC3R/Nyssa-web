const mongoose = require("mongoose");



//create a schema for storing user credentials
var profileschema = new mongoose.Schema({
    name:String,
    passwd:String,
});



//create a model for the profile collection
var profilemodel = mongoose.model('profile',profileschema);


//export the model
module.exports.profileModel = profilemodel;
