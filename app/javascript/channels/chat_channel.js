import consumer from './consumer';

window.subscribeToChat = (chat_name) => {
  console.log("-> subscribing to chat: ", chat_name);
  consumer.subscriptions.create({ channel: "ChatChannel", room: chat_name }, {
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
      const html = this.createLine(data)
      const element = document.querySelector(`[data-chat-room='${chat_name}']`)
      element.insertAdjacentHTML("beforeend", html)
    },

    removeEmptyMessage() {
      const query = `[data-chat-room="${chat_name}"] .empty-chat`;
      const element = document.querySelector(query);
      if (element) {
        element.remove();
      }
    },

    createLine(message) {
      return `
        <div class="message">
          <label class="text-muted">
            <strong>${message.from}</strong> at
            <span>${message.created_at}
          </label>
          <p>${message.body}</p>
        </div>
      `
    }
  });
}

document.addEventListener("turbolinks:load", () => {
  let chatContainer = document.querySelector('[data-chat-room]');
  if (chatContainer) {
    subscribeToChat(chatContainer.dataset.chatRoom);
  }
});
