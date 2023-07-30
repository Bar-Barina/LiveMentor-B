const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");

async function query() {
  try {
    const collection = await dbService.getCollection("codeblock");
    const codeblocks = await collection.find().toArray();
    return codeblocks;
  } catch (err) {
    logger.error("cannot find codeblocks", err);
    throw err;
  }
}

module.exports = {
  query,
};
