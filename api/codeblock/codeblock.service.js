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

async function getById(codeblockId) {
  try {
    const collection = await dbService.getCollection('codeblock')
    const codeblock = collection.findOne({ _id: ObjectId(codeblockId) })
    return codeblock
  } catch (err) {
    logger.error(`while finding codeblock ${codeblockId}`, err)
    throw err
  }
}


async function remove(codeblockId) {
  try {
    const collection = await dbService.getCollection('codeblock')
    await collection.deleteOne({ _id: ObjectId(codeblockId) })
    return codeblockId
  } catch (err) {
    logger.error(`cannot remove codeblock ${codeblockId}`, err)
    throw err
  }
}

async function add(codeblock) {
  try {
    const collection = await dbService.getCollection('codeblock')
    await collection.insertOne(codeblock)
    return codeblock
  } catch (err) {
    logger.error('cannot insert codeblock', err)
    throw err
  }
}

async function update(codeblock) {
  try {
    const codeblockToSave = {
      // brand: codeblock.brand,
    
    }
    const collection = await dbService.getCollection('codeblock')
    await collection.updateOne(
      { _id: ObjectId(codeblock._id) },
      { $set: codeblockToSave }
    )
    return codeblock
  } catch (err) {
    logger.error(`cannot update codeblock ${codeblockId}`, err)
    throw err
  }
}

// function _filterCodeblocks(codeblocks, filterBy) {
//   const { high, low, model } = filterBy
//   const filteredCodeblocks = codeblocks.filter((p) => {
//     if (model) {
//       const regex = new RegExp(model, 'i')
//       if (!regex.test(p.model)) return false
//       return true
//     }

//     if (high) {
//       codeblocks = codeblocks.sort((a, b) => b.price - a.price)
//     }

//     if (low) {
//       codeblocks = codeblocks.sort((a, b) => a.price - b.price)
//     }
//   })
//   return filteredCodeblocks
// }

module.exports = {
  query,
  getById,
  remove,
  add,
  update,
};
