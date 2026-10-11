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
    const html =
    `<ul>
    ${allDbUsers.map((users) => `<li> ${users.firstName} -> ${users.jobTitle}</li>`).join("")}
    </ul>`;
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



//In Node.js (specifically for http.Server or net.Server), 
// the listen method is used to start the server, bind it 
// to a specific network address, port, or file path, and 
// begin accepting incoming client connections and HTTP 
// requests. Once called, the server stays running and waits for traffic.
app.listen(PORT, () => console.log(`Server started PORT : ${PORT}`));


//1. listen(port: number, hostname: string, backlog: number, callback?: (error?: Error) => void)
// What it does: Binds the server to a specific port and hostname (IP address or domain), sets the 
// maximum length of the pending connections queue (backlog), and triggers the callback function 
// once the server has successfully started.

// Parameters:

// port: The port number to listen on (e.g., 8080).

// hostname: The IP address or interface (e.g., '127.0.0.1' or '0.0.0.0').

// backlog: The maximum number of queued connections waiting to be accepted.

// callback: Function executed once the server starts listening.

// 2. listen(port: number, hostname: string, callback?: (error?: Error) => void)
// What it does: Same as above, but omits the explicit backlog parameter, using the operating system's
//  default backlog value instead.

// Use case: When you want to specify both a port and a specific network interface without worrying 
// about connection queue limits.

// 3. listen(port: number, callback?: (error?: Error) => void)
// What it does: Binds the server to the specified port on all available network interfaces 
// (INADDR_ANY / 0.0.0.0), meaning it accepts connections from localhost, your local network, and 
// (if public) the internet.

// Use case: The most common way to start a standard web server locally or in production 
// (e.g., server.listen(3000)).

// 4. listen(callback?: (error?: Error) => void)
// What it does: Starts the server on a random/ephemeral port assigned automatically by the operating system,
//  binding it to localhost.

// Use case: Frequently used in automated testing (like Jest or Mocha) where you want to spin up a server
//  instance on a free port without risking port-collision errors.

// 5. listen(path: string, callback?: (error?: Error) => void)
// What it does: Listens for connections on a UNIX domain socket or named pipe specified by the file path
//  (instead of a TCP port).

// Use case: Used on Unix/Linux systems for high-performance, secure local Inter-Process Communication (IPC)
//  between apps running on the same machine (e.g., /tmp/app.sock).

// 6. listen(handle: any, listeningListener?: (error?: Error) => void)
// What it does: Listens on a given handle, which can be a pre-bound socket, a file descriptor, or a 
// server handle passed from another process (such as when using Node.js's cluster module to share a 
// port across multiple worker threads).

// Use case: Advanced load balancing and multi-core process clustering.
