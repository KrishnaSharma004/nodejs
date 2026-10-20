const express = require("express");
const path = require("path");

const { connectDB } = require("./connection");
const app = express();

const UrlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const PORT = 8001;

// DB connection : 
connectDB("mongodb://127.0.0.1:27017/url")
.then( () => console.log("Database connected successfully"))
.catch( (e) => console.log("ERROR :", e));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded ({extended : false}));

app.use("/" , staticRoute);

app.use("/url", UrlRoute);

app.listen(PORT, () => console.log("Server started at PORT :", PORT));
