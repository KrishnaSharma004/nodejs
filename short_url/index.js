const express = require("express");

const router = require("./routes/url");
const { connectDB } = require("./connection");
const app = express();

const PORT = 8001;

// DB connection : 
connectDB("mongodb://127.0.0.1:27017/url")
.then( () => console.log("Database connected successfully"))
.catch( (e) => console.log("ERROR :", e));

app.use(express.json());

app.use("/url", router);

app.listen(PORT, () => console.log("Server started at PORT :", PORT));
