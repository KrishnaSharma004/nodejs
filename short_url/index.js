const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const app = express();


const userroute = require("./routes/user");
const UrlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { restrictToLoggedInUserOnly , checkAuth} = require("./middleware/auth");
const PORT = 8001;

// DB connection : 
connectDB("mongodb://127.0.0.1:27017/url")
.then( () => console.log("Database connected successfully"))
.catch( (e) => console.log("ERROR :", e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded ({extended : false}));
app.use(cookieParser());


app.use("/user", userroute);
app.use("/" , checkAuth ,staticRoute);

app.use("/url",restrictToLoggedInUserOnly , UrlRoute);

app.listen(PORT, () => console.log("Server started at PORT :", PORT));
