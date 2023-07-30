const express = require("express");
const { log } = require("../../middlewares/logger.middleware");
const { getCodeblocks } = require("./codeblock.controller");
const router = express.Router();

router.get("/", log, getCodeblocks);

module.exports = router;
