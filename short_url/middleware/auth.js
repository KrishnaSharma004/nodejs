const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next){
    const tookenCookie = req.cookies?.token;
    req.user = null;
    if(!tookenCookie) return next();

    const token = tookenCookie;
    const user = getUser(token);
    
    req.user = user;

    next();
}   

function restrictTo(roles = []) {
    return function(req, res, next) {
        if(!req.user) return res.redirect("/login");
    

    if(!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
    }
    
}
module.exports = {
    checkForAuthentication,
    restrictTo
}