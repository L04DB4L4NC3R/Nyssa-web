const router = require("express").Router();
const verifyRoute = require("../helpers/login").verifyRoute;
const scrape = require("../helpers/scrape").scrape;




router.get('/',(req,res,next)=>{

    //TODO extract array from python output
    var array = ["polka underpants","shirt","underpants","condoms"];

    //TODO make loop work
    //for(query of array){
        scrape("https://www.amazon.com/s/?field-keywords=","shirt")
        .then(object=>res.send(object.html))
        .catch((err)=>{
            console.log(err);
            res.sendStatus(500);
        });
    //}
});

module.exports = router;
