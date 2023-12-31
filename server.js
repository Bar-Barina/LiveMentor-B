const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const http = require("http").createServer(app);

// Express App Config
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));

if (process.env.PORT === "production") {
  app.use(express.static(path.resolve(__dirname, "public")));
} else {
  const corsOptions = {
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:3030",
      "http://localhost:3030",
      "http://localhost:3000",
      "https://livementor.onrender.com",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const codeblockRoutes = require("./api/codeblock/codeblock.routes");
const { setupSocketAPI } = require("./services/socket.service");

// routes

app.use("/api/codeblock", codeblockRoutes);
setupSocketAPI(http);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/codeblock/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");

const port = process.env.PORT || "3030";
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
