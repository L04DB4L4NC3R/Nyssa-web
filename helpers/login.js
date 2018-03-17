const bcrypt = require("bcrypt");
const profileModel = require("../database/model").profileModel;
const salt = 10;



//to generate a hash
module.exports.hashAndSave = (obj)=>{

    return new Promise((resolve,reject)=>{

        bcrypt.hash(obj.passwd, salt, (err, hash)=> {

            obj.passwd = hash;

            obj.save().then(()=>{
                console.log("Save profile info");
                resolve("Saved");
            }).catch((err)=>{
                reject(err);
            });

        });



    });



}






module.exports.verifyRoute = (req,res,next)=>{

    if(req.session.email===undefined) res.sendStatus(403);
    else next();
}
