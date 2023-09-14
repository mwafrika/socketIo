const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat message", (message) => {
    io.emit("chat message", message);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
