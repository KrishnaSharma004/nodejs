const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New request Recieved\n`;
    fs.appendFile("./log.txt", log, (err, data) => {
        switch(req.url) {
            case "/" : 
                res.end("On Home Page");
                break;
            case "/about" : 
                res.end("Hey, My name is Krishna Sharma");
                break;
            case "/contact-us" : 
                res.end("My gmail : Ltkrishnasharma@gmail.com")
        }
        console.log(req.httpVersion)
    })
});

myServer.listen(8000, () => console.log("Hello from Server side"));
