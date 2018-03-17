var express = require('express');
var router = express.Router();
model = require("../database/model").profileModel;
hashAndSave = require("../helpers/login").hashAndSave;
const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.sendStatus(200);
});

//middleware to check tokens



router.post("/login",(req,res,next)=>{

    model.findOne( {name:req.body.name} ).then((data)=>{

        if(data === null)
            res.json({message:"User not found"});

        //check hash against password
        bcrypt.compare(req.body.passwd,data.passwd,(err,result)=>{

            if(err){ console.log(err); res.sendStatus(500) }

              if(result){
                  //save user email in cookies
                  req.session.email = req.body.email;
                  res.sendStatus(200);
              }


              else
                res.json({message:"incorrect password"});
        });

    });
});


router.post('/register',(req,res,next)=>{

    model.findOne({name:req.body.name}).then((user)=>{

        if(user === null){
            var obj = new model({
                name:req.body.name,
                passwd:req.body.passwd
            });
            hashAndSave(obj).then(()=>{
                //save user email in cookies;
                req.session.name = req.body.name;
                res.sendStatus(200);
            }).catch(err=>res.json({message:err}));
        }
        else res.json({message:"user already exists"});
    }).catch(err=>res.sendStatus(500));
});


module.exports = router;
