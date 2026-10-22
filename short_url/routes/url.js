const express = require("express");
const { handleGenerateShortId,
        handleRedirectTheUser,
        handleGetAnalytics
        } = require("../constrollers/url");
const router = express.Router();

router.post("/" , handleGenerateShortId);
router.get("/:ShortID", handleRedirectTheUser);
router.get("/analytics/:ShortID", handleGetAnalytics);

module.exports = router;