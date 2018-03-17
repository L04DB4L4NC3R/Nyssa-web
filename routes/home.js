const router = require("express").Router();
const verifyRoute = require("../helpers/login").verifyRoute;
const scrape = require("../helpers/scrape").scrape;
const multer = require("multer");
const fs = require("fs");

var uploads = multer({dest:'public/images/'});
//TODO uncomment this
router.use(verifyRoute);

router.get('/',(req,res,next)=>{
    res.json({message:"You have reached home"});
});


router.post('/',uploads.single("file"),(req,res,next)=>{

    if(req.file ===undefined ){
        res.redirect('/home');
    }
    else{
        fs.rename(req.file.path,"uploads/"+req.file.originalname)
        .then(()=>{
            res.redirect('/home/result');
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
    }

});






router.get('/result',(req,res,next)=>{

    //TODO extract array from python output
    var array = ["polka underpants","shirt","underpants","condoms"];

//https://www.amazon.com/s/?field-keywords=
    //TODO make loop work
    //for(query of array){
        scrape("https://www.flipkart.com/search?q=","skirt")
        .then(object=>res.send(object.html))
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
    //}
});



module.exports = router;
