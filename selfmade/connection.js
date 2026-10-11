const mongoose = require("mongoose");

async function connectMongooseDB(url){
    return mongoose.connect(url);
}

module.exports = {
    connectMongooseDB,
}