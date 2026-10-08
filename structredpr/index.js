const express = require("express");

const {connectMongoDB} = require("./connection");

const {logReqRes} = require("./middlewares/index");

const userRouter = require("./routes/user");
const app = express();

const PORT = 8000;


//Connection : 
connectMongoDB("mongodb://127.0.0.1:27017/sproject01")
.then(() => console.log("MongoDB connected !"));


//Middleware - Plugins 
app.use(express.urlencoded ({extended : false}));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started PORT : ${PORT}`));
