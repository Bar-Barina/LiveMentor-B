const logger = require("./logger.service");

var gIo = null;
var mentors = {};

function setupSocketAPI(http) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    logger.info(`New connected socket [id: ${socket.id}]`);

    // Join the socket to a room based on the codeblock ID
    socket.on("join room", (codeblockId) => {
      socket.join(codeblockId);

      if (!mentors[codeblockId]) {
        mentors[codeblockId] = socket.id;
        socket.emit("role assign", { role: "mentor" });
      } else {
        socket.emit("role assign", { role: "student" });
      }
    });

    socket.on("disconnect", () => {
      logger.info(`Socket disconnected [id: ${socket.id}]`);
    });

    socket.on("code change", (data) => {
      logger.info(
        `New code change from socket [id: ${socket.id}], emitting ${data.code}`
      );
      // Emit code update to all clients in the same room (code block page)
      gIo.to(data.codeblockId).emit("code update", data.code);
    });
  });
}

module.exports = {
  setupSocketAPI,
};
