import consumer from './consumer';

if (!window.openedChats)
  window.openedChats = [];

window.subscribeToChat = (chatRoom) => {
  const conn = consumer.subscriptions.create({ channel: "ChatChannel", room: chatRoom }, {
    connected() {
      console.log('-> Connection established for channel: ', chatRoom);
      window.openedChats.push(conn);
    },

    disconnected() {
      console.log('-> Disconnected from channel: ', chatRoom);
    },

    received(data) {
      this.appendLine(data);
      this.removeEmptyMessage();
    },

    appendLine(data) {
      const element = document.querySelector(`[data-chat-room='${chatRoom}']`)
      element.insertAdjacentHTML("beforeend", data.html)
    },

    removeEmptyMessage() {
      const query = `[data-chat-room="${chatRoom}"] .empty-chat`;
      const element = document.querySelector(query);
      if (element) {
        element.remove();
      }
    }
  });
}

document.addEventListener("turbolinks:load", () => {
  const chatContainer = document.querySelector('[data-chat-room]');
  if (chatContainer == null) return;

  if (weAreNotConnectedTo(chatContainer.dataset.chatRoom))
    subscribeToChat(chatContainer.dataset.chatRoom);
});

document.addEventListener("turbolinks:before-render", () => {
  // this code will run twice if the requested page is cached by Turbolinks
  if (openedChats.length == 0)
    return;

  openedChats.forEach(conn => {
    conn.unsubscribe();
  });
  openedChats = [];
});

function weAreNotConnectedTo(chatRoom) {
  let chatConnection = null;

  openedChats.forEach(conn => {
    const json = JSON.parse(conn.identifier);
    if (json.channel == "ChatChannel" && json.room == chatRoom)
      chatConnection = conn;
  });

  return !chatConnection;
}
