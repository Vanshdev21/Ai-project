const sendBtn = document.getElementById("sendBtn");
const chatPrompt = document.getElementById("chatPrompt");
const chatContainer = document.getElementById("chatContainer");

const createBtn = document.getElementById("createBtn");
const imagePrompt = document.getElementById("imagePrompt");
const imageGrid = document.getElementById("imageGrid");

async function sendMessage() {

    const message = chatPrompt.value.trim();

    if (!message) return;

    const userDiv = document.createElement("div");
    userDiv.classList.add("message", "user");
    userDiv.textContent = message;
    chatContainer.appendChild(userDiv);

    chatPrompt.value = "";

    const aiDiv = document.createElement("div");
    aiDiv.classList.add("message", "ai");
    aiDiv.textContent = "Thinking...";
    chatContainer.appendChild(aiDiv);

    try {

        const url =
            "https://text.pollinations.ai/" +
            encodeURIComponent(message);

        const response = await fetch(url);

        const text = await response.text();

        aiDiv.textContent = text;

    } catch (error) {

        aiDiv.textContent = "Failed to get response";
        console.error(error);

    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

chatPrompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function generateImage() {

    const prompt = imagePrompt.value.trim();

    if (!prompt) return;

    const card = document.createElement("div");
    card.classList.add("image-card");

    const img = document.createElement("img");

    img.src =
        "https://image.pollinations.ai/prompt/" +
        encodeURIComponent(prompt);

    card.appendChild(img);

    imageGrid.prepend(card);

    imagePrompt.value = "";
}

createBtn.addEventListener("click", generateImage);

imagePrompt.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generateImage();
    }
});