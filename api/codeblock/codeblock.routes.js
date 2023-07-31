const express = require("express");
const { log } = require("../../middlewares/logger.middleware");
const {
  getCodeblocks,
  getCodeblockById,
  addCodeblock,
  updateCodeblock,
  removeCodeblock,
} = require("./codeblock.controller");
const router = express.Router();

router.get("/", log, getCodeblocks);
router.get("/:id", getCodeblockById);
router.post("/", addCodeblock);
router.put("/:id", updateCodeblock);
router.delete("/:id", removeCodeblock);

module.exports = router;
