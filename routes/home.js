const router = require("express").Router();
const verifyRoute = require("../helpers/login").verifyRoute;
const scrape = require("../helpers/scrape").scrape;
const multer = require("multer");
const fs = require("fs");

var uploads = multer({dest:'public/images/'});

router.use(verifyRoute);

router.get('/',(req,res,next)=>{
    res.render('main');
});


router.post('/',uploads.single("file"),(req,res,next)=>{

    if(req.file ===undefined ){
        res.redirect('/home');
    }
    else{
        fs.rename(req.file.path,"public/images/"+req.file.originalname)
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
        scrape("https://www.amazon.co.uk/s/?field-keywords=","shirt")
        .then(()=>{
            fs.readFile(__dirname + '/scraped.txt','utf8',(err,data)=>{
                res.send(data)//data = data.split('$');
                //res.render("result",{data});
            });
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
    //}
});



module.exports = router;
