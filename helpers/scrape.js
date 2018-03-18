const request = require("request");
const cheerio = require("cheerio");
var pythonshell = require("python-shell");
const fs = require('fs');




module.exports.scrape = (url,query)=>{

    return new Promise((resolve,reject)=>{

        //concatenate search requirement to form query string TODO make it web parsable
        url += query;

            pythonshell.run('../scraping.py '+url,(err)=>{
            if(err){
                console.log(err);
                reject({html:err});
            }
            console.log("Ran a python script using node js");
            resolve({html:"done"});
        });

    });
}
