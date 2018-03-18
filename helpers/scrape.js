const request = require("request");
const cheerio = require("cheerio");
var shell = require("shelljs");
const fs = require('fs');




module.exports.scrape = (url,query)=>{

    return new Promise((resolve,reject)=>{

        //concatenate search requirement to form query string TODO make it web parsable
        url += query;

            resolve( shell.exec('python3 scraping.py '+url) );
        });

}
