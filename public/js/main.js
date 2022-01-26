const msg = document.getElementById("form");

msg.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    const div = document.createElement("div");
    div.innerHTML = `<div class="d-flex flex-row p-3" style="display: flex; justify-content: end">
    <div class="bg-white mr-2 p-3">
        <span class="text-muted">${message}.</span>
    </div>
    <img
        src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
        width="30"
        height="30"
    />
</div>`;

    document.querySelector("#chat-box").appendChild(div);

    console.log(message);
});
