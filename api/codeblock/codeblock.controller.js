const codeblockService = require("./codeblock.service.js");

const logger = require("../../services/logger.service.js");

async function getCodeblocks(req, res) {
  try {
    logger.debug("Getting Codeblocks");
    const codeblocks = await codeblockService.query();
    res.json(codeblocks);
  } catch (err) {
    logger.error("Failed to get Codeblocks", err);
    res.status(500).send({ err: "Failed to get Codeblocks" });
  }
}

module.exports = {
  getCodeblocks,
};
