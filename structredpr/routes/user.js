const express = require("express");
const {handleGetAllUsers, 
        handleGetUserById,
        handleEditUserById,
        handleDeleteUserById,
        handlePostUser
        } = require("../controllers/user");

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handlePostUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleEditUserById)
.delete(handleDeleteUserById);

module.exports = router
