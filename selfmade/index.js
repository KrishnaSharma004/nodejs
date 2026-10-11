const express = require("express");

const app = express();

const {connectMongooseDB} = require("./connection");

const { LogReqRes } = require("./middlewares/logs");

const userRoute = require("./routes/user");

const PORT = 8080;
//DB connection : 
connectMongooseDB('mongodb://127.0.0.1:27017/selfmade')
.then( () => console.log("Database connected!"))
.catch( (error) => console.log("ERROR : ", error));


app.use(express.urlencoded({extended : true}));
app.use(LogReqRes("log.txt"));

app.use("/api/users" , userRoute);

app.listen(PORT, () => console.log("Server started at PORT : ", PORT));
