const http = require("http");
const fs = require("fs");
const url = require("url")

//http module can not parse the url 
const myServer = http.createServer((req, res) => {
    if( req.url === "/favicon.ico" ) return res.end();
    const log = `${Date.now()}: ${req.url} New request Recieved\n`;
    const myurl = url.parse(req.url, true);
    console.log(myurl);

    fs.appendFile("./log.txt", log, (err, data) => {
        switch(myurl.pathname) {
            case "/" : 
                res.end("On Home Page");
                break;

            case "/about" : 
                const username = myurl.query.myname;
                res.end(`Hello, ${username}`);
                break;

            case "/contact-us" : 
                res.end("My gmail : Ltkrishnasharma@gmail.com")
                break;

            case "/search" : 
                const search = myurl.query.search_query;
                res.end("Here are your results for " + search);
                break;

            default : 
                res.end("404 not found");
        }
        console.log(req.httpVersion)
    })
});

myServer.listen(8000, () => console.log("Hello from Server side"));
