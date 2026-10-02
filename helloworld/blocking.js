const fs = require("fs")
const os = require("os")//information of the local system's OS

// console.log(os.cpus().length);
console.log("1");
//Blocking : 
// const result = fs.readFileSync("./test1.txt", "utf-8")
// console.log(result)
console.log("2")

//Non-blocking : 
fs.readFile("./test.txt", "utf-8", (err, result) => {
    if(err) throw err;
    else console.log(result)
})
console.log("2")
console.log("4")
console.log("5")
console.log("6")
