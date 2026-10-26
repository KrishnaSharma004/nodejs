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
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users",
    },
    VisitHistory : [{timestamp : {type : Number}}],
}, {timestamps : true}
);

const URL = mongoose.model("url", urlschema);

module.exports = URL;