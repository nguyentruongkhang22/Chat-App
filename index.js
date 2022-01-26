const events = require("events");
const express = require("express");
const path = require("path");

const PORT = 3000 || process.env.PORT;
const app = express();

const message = new events();
app.use(express.static(path.join(__dirname, "public")));
message.on("newMessage", (data) => {
    console.log(data);
});

message.emit("newMessage", "A new message has been sent");

app.listen(PORT, () => {
    console.log("Server is running!");
});
