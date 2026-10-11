const URL = require("../models/url");
const shortid = require("shortid");

async function handleGenerateShortId(req, res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ error : "url is required"});
    }
    const ShortID = shortid();
    const result = await URL.create({
        ShortID : ShortID,
        ReDirectedURL : body.url,
        VisitHistory : [],
    })
    console.log(result);
    return res.status(201).json({status : "short id is created", short_id : ShortID});
};

async function handleRedirectTheUser(req, res) {
    const ShortID = req.params.ShortID;
    const entry = await URL.findOneAndUpdate({
            ShortID,
        },
        { $push : {
            VisitHistory : {timestamp : Date.now()}
        }
        }
    )
    res.redirect(entry.ReDirectedURL);
}
module.exports = {
    handleGenerateShortId,
    handleRedirectTheUser
}