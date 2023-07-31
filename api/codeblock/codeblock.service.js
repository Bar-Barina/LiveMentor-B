const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

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

async function getById(codeblockId) {
  try {
    const collection = await dbService.getCollection("codeblock");
    const codeblock = collection.findOne({ _id: ObjectId(codeblockId) });
    return codeblock;
  } catch (err) {
    logger.error(`while finding codeblock ${codeblockId}`, err);
    throw err;
  }
}

// IN PROGRESS
async function remove(codeblockId) {
  try {
    const collection = await dbService.getCollection("codeblock");
    await collection.deleteOne({ _id: ObjectId(codeblockId) });
    return codeblockId;
  } catch (err) {
    logger.error(`cannot remove codeblock ${codeblockId}`, err);
    throw err;
  }
}

// IN PROGRESS
async function add(codeblock) {
  try {
    const collection = await dbService.getCollection("codeblock");
    await collection.insertOne(codeblock);
    return codeblock;
  } catch (err) {
    logger.error("cannot insert codeblock", err);
    throw err;
  }
}

async function update(codeblock) {
  console.log("service", codeblock);
  try {
    const codeblockToSave = {
      title: codeblock.title,
      difficulty: codeblock.difficulty,
      code: codeblock.code,
      solution: codeblock.solution,
      explanation: codeblock.explanation,
    };
    const collection = await dbService.getCollection("codeblock");
    await collection.updateOne(
      { _id: ObjectId(codeblock._id) },
      { $set: codeblockToSave }
    );
    return codeblock;
  } catch (err) {
    logger.error(`cannot update codeblock ${codeblockId}`, err);
    throw err;
  }
}

// IN PROGRESS
function _filterCodeblocks(codeblocks, filterBy) {
  const { title, difficulty } = filterBy;
  const filteredCodeblocks = codeblocks.filter((p) => {
    if (title) {
      const regex = new RegExp(title, "i");
      if (!regex.test(p.title)) return false;
      return true;
    } else if (difficulty) {
      const regex = new RegExp(difficulty, "i");
      if (!regex.test(p.difficulty)) return false;
      return true;
    }
  });
  return filteredCodeblocks;
}

module.exports = {
  query,
  getById,
  remove,
  add,
  update,
};
