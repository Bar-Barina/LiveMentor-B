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

async function getCodeblockById(req, res) {
  try {
    const codeblockId = req.params.id;
    const codeblock = await codeblockService.getById(codeblockId);
    res.json(codeblock);
  } catch (err) {
    logger.error("Failed to get codeblock", err);
    res.status(500).send({ err: "Failed to get codeblock" });
  }
}

// IN PROGRESS
async function addCodeblock(req, res) {
  try {
    const codeblock = req.body;
    const addedCodeblock = await codeblockService.add(codeblock);
    res.json(addedCodeblock);
  } catch (err) {
    logger.error("Failed to add codeblock", err);
    res.status(500).send({ err: "Failed to add codeblock" });
  }
}

async function updateCodeblock(req, res) {
  try {
    const codeblock = req.body;
    console.log("controller", codeblock);
    const updatedCodeblock = await codeblockService.update(codeblock);
    res.json(updatedCodeblock);
  } catch (err) {
    logger.error("Failed to update codeblock", err);
    res.status(500).send({ err: "Failed to update codeblock" });
  }
}

// IN PROGRESS
async function removeCodeblock(req, res) {
  try {
    const codeblockId = req.params.id;
    const removedId = await codeblockService.remove(codeblockId);
    res.send(removedId);
  } catch (err) {
    logger.error("Failed to remove codeblock", err);
    res.status(500).send({ err: "Failed to remove codeblock" });
  }
}

module.exports = {
  getCodeblocks,
  getCodeblockById,
  addCodeblock,
  updateCodeblock,
  removeCodeblock,
};
