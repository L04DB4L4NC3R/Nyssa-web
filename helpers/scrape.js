const request = require("request");
const cheerio = require("cheerio");




module.exports.scrape = (url,query)=>{

    return new Promise((resolve,reject)=>{

        //concatenate search requirement to form query string TODO make it web parsable
        url += query;

        request(url,(err,resp,data)=>{

            if(err) reject(err);

            var $ = cheerio.load(data);

            //TODO
            var dom = 'div._2SxMvQ';
            var soup = $(dom);

            // $(dom).each((i,data)=>{
            //     var element = $(this);
            //     console.log(element);
            // });
            resolve({html:soup.html()});

        });
    });
}
