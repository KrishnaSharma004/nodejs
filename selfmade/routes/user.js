const express = require("express");
const { handleGetAllUsers,
        handleGetUserById,
        handleDeleteUserById,
        handleEditUserById,
        handleCreateNewUser
        } = require("../controllers/index");
const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

router.route("/:id")
.get(handleGetUserById)
.patch(handleEditUserById)
.delete(handleDeleteUserById)

module.exports = router;