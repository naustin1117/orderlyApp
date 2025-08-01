function toggleChat() {
  const body = document.getElementById("chatbot-body");
  body.style.display = body.style.display === "none" ? "block" : "none";
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("You", message);
  input.value = "";

  appendMessage("Bot", "Thinking...");

  try {
    const res = await fetch("https://your-remix-app.up.railway.app/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();

    const messages = document.getElementById("chat-messages");
    messages.lastChild.remove();
    appendMessage("Bot", data.response);
  } catch (e) {
    console.error(e);
    appendMessage("Bot", "Oops! Something went wrong.");
  }
}

function appendMessage(sender, text) {
  const messages = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
