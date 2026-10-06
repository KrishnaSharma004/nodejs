const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.use(express.urlencoded ({extended : false}));

app.use((req, res, next) => {
    console.log("Hello from MiddleWare 1");
    req.username = "krishnasharma.dev";//can be accessed by other middleware functions 
    next();
})
app.use((req, res, next) => {
    console.log("Hello from MiddleWare 2" , req.username);
    // res.json({msg : "Hello from MiddleWare 2"});
    next();
})
//Routes 
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((users) => `<li> ${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//Rest Api 
app.get("/api/users", (req, res) => {
    return res.json(users);
})

app.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    console.log(id);
    const user = users.find((user) => user.id === id);
    if(user == undefined){
        return res.status(404).json({msg : "User not found"});
    }
    console.log(user)
    return res.json(user);
}).patch((req,res) => {
    //Edit user with Id 
    return res.status(501).json({msg : "method not available"});
}).delete((req,res) => {
    const id = Number(req.params.id);
    console.log(id);
    const useridx = users.findIndex((user) => user.id === id);
    if(useridx === -1){
        return res.status(404).json({status : "error", message : "User not found"});
    }
    console.log("Deleted user : ");
    console.log(users.splice(useridx, 1));
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err, data) => {
        if(err){
            return res.status(500).json({status : "error", message : "Failed to delete user"});
        }
        return res.json({status : "success", message : `user with id ${id} is deleted`});
    });
});
app.post("/api/users", (req, res) => {
    //body of the given data send by user : 
    const body = req.body;
    const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;   
    users.push({ ...body, id: newId });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2) , (err, data) => {
        return res.status(201).json({status : "Success", id : newId});
    });
});
// app.patch("/api/users/:id", (req,res) => {
//     //Edit the user with id 
//     return res.json({status : "Pending"});
// })
// app.delete("/api/users/:id", (req,res) => {
//     //Delete the user with id
//     return res.json({status : "Pending"});
// })
app.listen(PORT, () => console.log(`Server started PORT : ${PORT}`));
