import consumer from './consumer';

if (!window.openedChats)
  window.openedChats = [];

window.subscribeToChat = (chat_name) => {
  console.log("-> subscribing to chat: ", chat_name);
  const conn = consumer.subscriptions.create({ channel: "ChatChannel", room: chat_name }, {
    connected() {
      console.log('-> Connection established for channel: ', chat_name);
    },

    disconnected() {
      console.log('-> Disconected from: ', chat_name);
    },

    received(data) {
      this.appendLine(data);
      this.removeEmptyMessage();
    },

    appendLine(data) {
      const element = document.querySelector(`[data-chat-room='${chat_name}']`)
      element.insertAdjacentHTML("beforeend", data.html)
    },

    removeEmptyMessage() {
      const query = `[data-chat-room="${chat_name}"] .empty-chat`;
      const element = document.querySelector(query);
      if (element) {
        element.remove();
      }
    }
  });

  window.openedChats.push(conn);
}

document.addEventListener("turbolinks:load", () => {
  const chatContainer = document.querySelector('[data-chat-room]');
  if (chatContainer == null)
    return;

  const chatRoom = chatContainer.dataset.chatRoom;
  let chatConnection = null;

  openedChats.forEach(conn => {
    const json = JSON.parse(conn.identifier);
    if (json.channel == "ChatChannel" && json.room == chatRoom)
      chatConnection = conn;
  });

  if (chatConnection != null)
    return;

  subscribeToChat(chatContainer.dataset.chatRoom);
});
