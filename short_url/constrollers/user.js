const User = require("../models/user");
const {v4 : uuidv4} = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("home");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user)
        return res.render("login", {
            error : "Invalid Username or Password",
        });
    const SessionID = uuidv4();
    setUser(SessionID, user);
    res.cookie("uid", SessionID);
    return res.redirect("/");
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}