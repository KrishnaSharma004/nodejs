const express = require("express");
const { handleGetHomepage,
        } = require("../constrollers/url");

const router = express.Router();

router.get("/", handleGetHomepage);

router.get("/signup" , (req, res) => {
    return res.render("signup");
})

router.get("/login", (req, res) => {
    return res.render("login");
})

module.exports = router;