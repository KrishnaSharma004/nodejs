const fs = require("fs");

//sync..
fs.writeFileSync("./test.txt", "Hey Krishna here")

//async..
fs.writeFile("./test1.txt", "HEy, Radhe Radhe\n", (err) => {})

//Reading a file ; 
//1.Sync... reading
const results = fs.readFileSync("./read.txt", "utf-8")//(path, encoding)
//in sync reading it returns the content
console.log(results);

//2.Async.. .reading
//in async reading it doesn't returns anything
fs.readFile("./read.txt", "utf-8", (err, results) => {
    if(err){
        console.log("Error" , err);
    }else{
        console.log(results);
    }
});

//Appending a file : 
//1.Sync..
fs.appendFileSync("./test.txt", `${Date.now()} Hey Radhe Radhe\n`);

fs.appendFile("./test1.txt", "File appended async", "utf-8", (err) => {
    if(err){
        throw(err);
    }else{
        console.log("File appended async.. successful");
    }
})

//copy file : 
fs.copyFileSync("test.txt", "read.txt")//overwritess the file to which you are copying

//Delete files : 
//1.sync....
// fs.unlinkSync("./unwanted.txt")

//2.async....
// fs.unlink("./unwanted.txt", (err) => {
//     if(err) throw err;
//     else console.log("File deleted succesfully!")
// })
//Stats of a file : 
// console.log(fs.statSync("./read.txt"))
fs.stat("./read.txt", (err, stats) => {
    if(err) throw err;
    else console.log(stats);
});