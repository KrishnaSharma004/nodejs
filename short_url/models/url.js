const mongoose = require("mongoose");

const urlschema = new mongoose.Schema( {
    ShortID : {
        type: String,
        required: true,
        unique: true,
    },
    ReDirectedURL : {
        type: String,
        required: true,
    },
    VisitHistory : [{timestamp : {type : Number}}]
}, {timestamps : true}
);

const URL = mongoose.model("url", urlschema);

module.exports = URL;