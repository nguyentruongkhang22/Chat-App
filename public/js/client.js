const msg = document.getElementById("text");
const haha = document.getElementById("metQua");

const submitData = () => {
    console.log(haha.value);
};

const socket = io("http://localhost:3001");
let userName = "";
socket.on("connect", () => {
    console.log("Successfully connected!");
});

socket.on("userName", (data) => {
    userName = data;
});

// LISTEN TO ENTER
msg.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" && msg.value.length !== 0) {
        sendMessage();
    }
});

// RECEIVE MESSAGE FROM OTHER USERS
socket.on("message", (e, messager) => {
    appendNewMessage(e, messager);
});

// SEND NEW MESSAGE FROM THIS USER
const sendMessage = () => {
    const message = msg.value;
    appendNewMessage(message);
    socket.emit("newMessage", message);
};

const appendNewMessage = (message, messager) => {
    // Append new message to chat box
    const div = document.createElement("div");
    div.innerHTML =
        messager !== "others"
            ? `
    <div class="d-flex flex-row p-3" style="display: flex; justify-content: end">
        <div class="bg-white mr-2 p-3">
        <p class="text-sm-right">${userName}</p>
            <span class="text-muted"">
            <p class="alas">
            ${message}
            </p>
            </span>
        </div>
        
        <img
            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
            width="30"
            height="30"
        />
    </div>`
            : `
    <div class="d-flex flex-row p-3" style="display: flex; justify-content: start">
        <img
            src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
            width="30"
            height="30"
        />
        <div class="bg-white mr-2 p-3">
        <p class="text-sm-left">${userName}</p>
            <span class="text-muted"">
            <p class="alas">
            ${message}
            </p>
            </span>
        </div>

    </div>`;
    document.querySelector("#chat-box").appendChild(div);

    // Scroll to the latest message
    div.scrollIntoView();

    // Clear message box after sending message
    msg.value = "";
};
