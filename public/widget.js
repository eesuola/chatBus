(function () {
  const chatBox = document.createElement("div");
  chatBox.innerHTML = `
    <div id="chatWidget" style="position:fixed;bottom:20px;right:20px;width:300px;height:400px;border:1px solid #ccc;background:#fff;padding:10px;">
      <div id="chatMessages" style="height:80%;overflow:auto;"></div>
      <input id="chatInput" style="width:80%" placeholder="Type a message..." />
      <button id="chatSend">Send</button>
    </div>
  `;
  document.body.appendChild(chatBox);

  const socket = io("http://localhost:4000"); // backend server
  const userId = Math.floor(Math.random() * 10000);
  socket.emit("join", { userId });

  document.getElementById("chatSend").onclick = () => {
    const msg = document.getElementById("chatInput").value;
    socket.emit("chatMessage", { userId, content: msg, sender: "visitor" });
    document.getElementById("chatInput").value = "";
  };

  socket.on("chatMessage", (msg) => {
    const div = document.createElement("div");
    div.innerText = msg.sender + ": " + msg.content;
    document.getElementById("chatMessages").appendChild(div);
  });
})();
