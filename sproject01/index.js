const express = require("express");
const fs = require("fs");
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
// const { type } = require("os");

//Connection : 
mongoose
    .connect("mongodb://127.0.0.1:27017/sproject01")
    .then(() => console.log("MOngoose Connected"))
    .catch((err) => console.log("Mongoose error", err));


//Schema : 
const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
    },
    lastName: {
        type : String,
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    jobTitle: {
        type : String,
    },
    gender: {
        type : String,
    }
}, {timestamps : true}
);
//model : 
const User = mongoose.model("user", userSchema);

app.use(express.json());
app.use(express.urlencoded ({extended : false}));

//Middleware - Plugins 
// app.use((req, res, next) => {
//     console.log("Hello from MiddleWare 1");
//     req.username = "krishnasharma.dev";//can be accessed by other middleware functions 
//     next();
// })
// app.use((req, res, next) => {
//     console.log("Hello from MiddleWare 2" , req.username);
//     // res.json({msg : "Hello from MiddleWare 2"});
//     next();
// })
//Routes 
app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((users) => `<li> ${users.firstName} -> ${users.jobTitle}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})

//Rest Api 
app.get("/api/users", async (req, res) => {
    // res.setHeader("X-server_name", "krishnasharma");//custom header
    //Always use X in custom headers 
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})

app.route("/api/users/:id")
.get(async (req, res) => {
    // const id = Number(req.params.id);
    // console.log(id);
    // const user = users.find((user) => user.id === id);
    const user = await User.findById(req.params.id);
    if(user == undefined){
        return res.status(404).json({msg : "User not found"});
    }
    console.log(user)
    return res.json(user);
}).patch(async (req,res) => {
    //Edit user with Id 
    await User.findByIdAndUpdate(req.params.id, {jobTitle : "Changed..."});
    return res.status(200).json({msg : "User edited......"});
}).delete(async (req,res) => {
    // const id = Number(req.params.id);
    // console.log(id);
    // const useridx = users.findIndex((user) => user.id === id);
    // if(useridx === -1){
    //     return res.status(404).json({status : "error", message : "User not found"});
    // }
    // console.log("Deleted user : ");
    // console.log(users.splice(useridx, 1));
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err, data) => {
    //     if(err){
    //         return res.status(500).json({status : "error", message : "Failed to delete user"});
    //     }
    //     return res.json({status : "success", message : `user with id ${id} is deleted`});
    // });

    //Using mongoose : 
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Successfull"});
});
app.post("/api/users", async (req, res) => {
    //body of the given data send by user : 
    const body = req.body;
    if( !body ||
        !body.first_name || 
        !body.last_name ||
        !body.email || 
        !body.gender || 
        !body.job_title
    ){
        return res.status(400).json({message : "All fields are required..."});
    }
    // const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;   
    // users.push({ ...body, id: newId });
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2) , (err, data) => {
    //     return res.status(201).json({status : "Success", id : newId});
    // });

    //Using mongoose : 
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });
    return res.status(201).json({msg : "Created"});
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
