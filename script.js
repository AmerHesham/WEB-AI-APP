const apiKey = CONFIG.GEMINI_API_KEY;  // Replace with your real key

async function sendMessage() {
  const input = document.getElementById("user-input").value.trim();
  if (!input) return; // ! = not

  addToChat("You", input);

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `You are a high rated therapist that evaluate mental health of the person, if the message contains content of different topics reply with that you are here to help with mental issues only and shortly, do not use markdown and respond in paragraph format, Respond supportively and kindly to this person: "${input}"` }] }]
    })
  });

  const data = await response.json();
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, there is internal server error.";

  addToChat("Bot", reply);
  document.getElementById("user-input").value = "";
}

function addToChat(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.style="margin-bottom: 10px"
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
