const router = require("express").Router();
const verifyRoute = require("../helpers/login").verifyRoute;
const scrape = require("../helpers/scrape").scrape;
const multer = require('multer');
var upload = multer({dest:'public/images/'});
const fs = require("fs");



router.use(verifyRoute);

router.get('/',(req,res,next)=>{
    res.render('main');
});


router.post('/',upload.single('file'),(req,res,next)=>{


// console.log(req.body);
// res.send(200);
//
// res.send("hag")
//     var base64Data = req.body.data.split(',')[0].replace(/^data:image\/png;base64,/, "");

//require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
  //console.log(err);
//});






    if(req.body.file ===undefined ){
        res.redirect('/home');
    }
    else{
        res.redirect('/home/result');
        // fs.rename(req.file.path,"public/images/"+req.file.originalname)
        // .then(()=>{
        //     res.redirect('/home/result');
        // })
        // .catch((err)=>{
        //     console.log(err);
        //     res.sendStatus(500);
        // });
    }

});






router.get('/result',(req,res,next)=>{

    //TODO extract array from python output
    var array = ["polka","shirt","underpants","pants"];

//https://www.amazon.com/s/?field-keywords=
    //TODO make loop work
    //for(query of array){
        scrape("https://www.amazon.co.uk/s/?field-keywords=","black+pants+for+men")
        .then(()=>{
            fs.readFile(__dirname + '/scraped.txt','utf8',(err,data)=>{
                fs.readFile(__dirname+'/html.txt','utf8',(err,d)=>{
                    res.send(d+data+'</div></body>')
                });
            });
        })
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
    //}
});



module.exports = router;
