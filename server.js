// DEPENDENCIES
const express = require("express");
require("pretty-error").start();
const morgan = require("morgan");
const path = require("path");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// SETUPS
const PORT = 3001 || process.env.PORT;
const ids = [];

// USING MIDDLEWARES
const router = app.use(express.Router());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTING
router.route("/chat-room").get((req, res) => {
    res.sendFile(`${__dirname}./public/chat-room.html`);
});

router.route("/chat-room").post((req, res) => {
    console.log(req.body.text);
    if (req.body.text.length !== 0) {
        io.on("connection", (socket) => {
            socket.emit("userName", req.body.text);
            socket.broadcast.emit("message", "others");
            ids.push({
                id: socket.id,
                name: req.body.text,
            });
            console.log(
                `A new challenger with id: ${socket.id} has approached!\n
            <============================================================>`
            );
            socket.on("newMessage", (e) => {
                socket.broadcast.emit("message", e, "others");
            });
        });
    }
    res.sendFile(`${__dirname}/public/chat-room.html`);
});

// SERVER
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}!`);
});
