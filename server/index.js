// const http = require("http");
// const fs = require("fs");
// const url = require("url")
const express = require("express");

const app = express();

app.get("/", (req,res) => {
    return res.send("On Home Page");
})
app.get("/about" , (req, res) => {
    const myname = req.query.myname
    if(myname === undefined ) return res.send("Hey, anonymous!");
    return res.send(`Your name is , ${req.query.myname}, your age is , ${req.query.age}`);
})
app.get("./contact", (req, res) => {
    const mail = req.query.mail
    if(mail === undefined) res.send("mail not found!")
    res.send("Your mail is " + req.query.mail)
})
app.listen(8000, () => console.log("Server Started"));
// function myHandler(req, res){
//     if( req.url === "/favicon.ico" ) return res.end();
//     const log = `${Date.now()}: ${req.method} ${req.url} New request Recieved\n`;
//     const myurl = url.parse(req.url, true);
//     // console.log(myurl);

//     fs.appendFile("./log.txt", log, (err, data) => {
//         switch(myurl.pathname) {
//             case "/" : 
//                 if(req.method === "GET") res.end("you are on Home Page");
//                 break;

//             case "/about" : 
//                 const username = myurl.query.myname;
//                 if(username === undefined) res.end("Hello Anonymous");
//                 res.end(`Hello, ${username}`);
//                 break;

//             case "/contact-us" : 
//                 res.end("My gmail : Ltkrishnasharma@gmail.com")
//                 break;

//             case "/search" : 
//                 const search = myurl.query.search_query;
//                 res.end("Here are your results for " + search);
//                 break;
//             case "/signup" :
//                 if(req.method === "GET") res.end("This is a signup form");
//                 else if (req.method === "POST"){
//                     //DB query
//                     res.end("Succesfull signup");
//                 }
//                 break;
    
//             default : 
//                 res.end("404 not found");
//         }
//         console.log(req.httpVersion)
//     })
// }

//http module can not parse the url 
// const myServer = http.createServer(myHandler);

// myServer.listen(8000, () => console.log("Hello from Server side"));
