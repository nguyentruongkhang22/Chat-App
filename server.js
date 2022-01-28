const express = require("express");
require("pretty-error").start();
const app = express();
const path = require("path");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const PORT = 3001 || process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log(`A new challenger with id: ${socket.id} has approached!`);
    socket.on("newMessage", (e) => {
        socket.broadcast.emit("message", e, "others");
    });
});

server.listen(PORT, () => {
    console.log("Good night!");
});
