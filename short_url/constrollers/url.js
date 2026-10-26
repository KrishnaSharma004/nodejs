const URL = require("../models/url");
const shortid = require("shortid");


async function handleGetAnalytics(req, res) {
    const ShortID = req.params.ShortID;
    console.log(ShortID);
    const url = await URL.findOne({ShortID});
    console.log(url);
    if(!url){
        return res.json({error : "invalid short ID"});
    }
    return res.json({NumberOfClicks : url.VisitHistory.length  , VisitHistory : url.VisitHistory})
}
async function handleGetHomepage(req, res) {
    console.log(req.user);
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy : req.user._id});
    console.log(allUrls);
    return res.render("home", {
        urls : allUrls,
    });
}

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
        createdBy : req.user._id,
    })
    console.log(result);
    console.log(req.user._id);
    const allUrls = await URL.find({createdBy : req.user._id});
    return res.render("home", {
        id : ShortID,
        urls : allUrls
    })
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
    handleRedirectTheUser,
    handleGetHomepage,
    handleGetAnalytics,
}