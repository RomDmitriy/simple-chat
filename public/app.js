const connectionStatus = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("chat");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("usernameInput");

var ws;

const connect = () => {
  ws = new WebSocket("ws://localhost:3000");
  ws.onopen = () => {
    setStatus("Online");
    messageInput.disabled = false;
  }
  ws.onclose = () => {
    setStatus("Offline");
    messageInput.disabled = true;
    console.log('Trying to reconnect');
    setTimeout(connect, 5000);
  }
  ws.onmessage = (response) => printMessage(response.data);
}

connect();


function setStatus(newStatus) {
  connectionStatus.innerHTML = newStatus;
}

function printMessage(message) {
  const li = document.createElement("li");
  console.log(message)
  li.innerHTML = message;
  messages.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  ws.send(JSON.stringify({username: usernameInput.value, message: messageInput.value}));
  messageInput.value = "";
});
