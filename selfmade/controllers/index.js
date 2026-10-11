const User = require("../models/user");

async function handleGetAllUsers(req, res){
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUserById(req, res){
    const userwithId = await User.findById(req.params.id);
    if(userwithId === undefined){
        return res.status(400).json({Message : "User not Found"});
    }
    console.log(userwithId);
    return res.json(userwithId);
}

    
async function handleDeleteUserById(req, res){
    await User.findByIdAndDelete(req.param.id);
    return res.json({status : "Successfull"});
}

async function handleCreateNewUser(req, res){
    const body = req.body;
    if( !body ||
        !body.firstName || 
        !body.lastName ||
        !body.email ||
        !body.gender
    ){
        return res.status(400).json({message : "All fields are required"});
    }
    const createdUser = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email : body.email,
        gender : body.gender
    })
    return res.status(201).json({message : "User created successfully"});
}


async function handleEditUserById(req, res){
    await User.findByIdAndUpdate(req.param.id);
    return res.json({status : "User edited successfully"});
}

module.exports = {
    handleEditUserById,
    handleCreateNewUser,
    handleDeleteUserById,
    handleGetUserById,
    handleGetAllUsers
}
