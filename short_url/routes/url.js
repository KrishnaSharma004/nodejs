const express = require("express");
const { handleGenerateShortId,
        handleRedirectTheUser
        } = require("../constrollers/index");
const router = express.Router();

router.post("/" , handleGenerateShortId);
router.get("/:ShortID", handleRedirectTheUser);

module.exports = router;