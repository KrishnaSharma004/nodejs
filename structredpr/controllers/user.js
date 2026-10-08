const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({msg : "User not found..."});
    console.log(user)
    return res.json(user);
}

async function handleEditUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, {jobTitle : "Changed..."});
    return res.status(200).json({msg : "User edited......"});
}

async function handleDeleteUserById(req, res)  {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status : "Successfull"});
}

async function handlePostUser(req, res) {
    const body = req.body;
    if( !body ||
        !body.first_name || 
        !body.last_name ||
        !body.email || 
        !body.gender || 
        !body.job_title
    ){
        return res.status(400).json({message : "All fields are required..."});
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });
    return res.status(201).json({msg : "Created" , id : result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleEditUserById,
    handleDeleteUserById,
    handlePostUser
}