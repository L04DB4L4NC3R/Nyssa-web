var express = require('express');
var router = express.Router();
var model = require("../database/model").profileModel;
var hashAndSave = require("../helpers/login").hashAndSave;
var verifyRoute = require("../helpers/login").verifyRoute;
const bcrypt = require("bcrypt");

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index');
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
                  req.session.name = req.body.name;
                  res.redirect('/home');
              }


              else
                res.json({message:"incorrect password"});
        });

    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/register',(req,res,next)=>{
    res.render('signup');
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
                res.redirect('/home');
            }).catch(err=>res.json({message:err}));
        }
        else res.json({message:"user already exists"});
    }).catch(err=>res.sendStatus(500));
});


router.get('/logout',verifyRoute,(req,res,next)=>{

    req.session.name = undefined;
    res.redirect('/');

});

module.exports = router;
