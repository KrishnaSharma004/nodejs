const express = require("express");
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

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
    const user = users.find((user) => user.id == id);
    return res.json(user);
}).patch((req,res) => {
    //Edit user with Id 
    res.json({status : "User edited"});
}).delete((req,res) => {
    //Delete the user with Id
    res.json({status : "User Deleted" })
})
app.put("/api/users", (req, res) => {
    //Create a new user : 
    return res.json({status : "Pending"});
})
// app.patch("/api/users/:id", (req,res) => {
//     //Edit the user with id 
//     return res.json({status : "Pending"});
// })
// app.delete("/api/users/:id", (req,res) => {
//     //Delete the user with id
//     return res.json({status : "Pending"});
// })
app.listen(PORT, () => console.log("Server started"));