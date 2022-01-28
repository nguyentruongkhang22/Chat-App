const msg = document.getElementById("form");
const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("Successfully connected!");
});

socket.on("message", (e, messager) => {
    appendNewMessage(e, messager);
});

const sendMessage = () => {
    const message = document.getElementById("text").value;
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
            <span class="text-muted">${message}.</span>
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
            <span class="text-muted">${message}.</span>
        </div>

    </div>`;
    document.querySelector("#chat-box").appendChild(div);

    // Scroll to the latest message
    div.scrollIntoView();

    // Clear message box after sending message
    document.getElementById("text").value = "";
};
