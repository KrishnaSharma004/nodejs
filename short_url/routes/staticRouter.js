const express = require("express");
const { handleGetHomepage,
        } = require("../constrollers/index");

const router = express.Router();

router.get("/", handleGetHomepage);


module.exports = router;