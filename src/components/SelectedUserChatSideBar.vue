<script setup>
import Drawer from "primevue/drawer";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useChatStore } from "../store/chat/useChatStore.js";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import {onMounted, watch} from "vue";
import * as signalR from "@microsoft/signalr";

const chatStore = useChatStore();
const authStore = useAuthStore();
let connection;

watch(
    () => chatStore.showChatSideBar,
    (newVal) => {
      if (newVal) {
        chatStore.getChatMessages(authStore.loggedInUser.id, chatStore.clickedUser.id);
      }
    }
);

onMounted(() => {
  connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5233/chatHub", {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

  connection.start().then(() => {
    console.log("Connected to ChatHub");
  }).catch(err => console.error(err.toString()));

  connection.on("ReceiveMessage", (senderId, message) => {
    console.log(`Message from ${senderId}: ${message}`);

    if (senderId === chatStore.clickedUser.id || senderId === authStore.loggedInUser.id) {
      chatStore.chatMessages.push({
        senderId,
        receiverId: senderId === authStore.loggedInUser.id ? chatStore.clickedUser.id : authStore.loggedInUser.id,
        message,
        sentAt: new Date().toISOString(),
        isRead: false,
      });
    }
  });
})
</script>

<template>
  <Drawer
      v-model:visible="chatStore.showChatSideBar"
      :header="chatStore.clickedUser.firstName + ' ' + chatStore.clickedUser.lastName"
      position="right"
      style="width: 50%"
  >
    <div v-if="chatStore.chatMessages.length < 1">
      <p class="mt-5 pt-5 text-center">You dont have any chat with {{ chatStore.clickedUser.firstName }} {{chatStore.clickedUser.lastName }}</p>
    </div>
    <div v-else v-for="message in chatStore.chatMessages" :key="message.id" class="message-container">
      <small :class="message.senderId === authStore.loggedInUser.id ? 'text-end' : 'text-start'">
        {{
          message.senderId === authStore.loggedInUser.id
              ? authStore.loggedInUser.firstName + ' ' + authStore.loggedInUser.lastName
              : chatStore.clickedUser.firstName + ' ' + chatStore.clickedUser.lastName
        }}
      </small>
      <div
          :class="['message', message.senderId === authStore.loggedInUser.id ? 'sent' : 'received']"
      >
        <p>{{ message.message }}</p>
        <small>{{ new Date(message.sentAt).toLocaleString() }}</small>
      </div>
    </div>
    <template #footer>
      <div class="d-flex justify-content-between gap-2">
        <InputText class="w-100" v-model="chatStore.messageToSend" />
        <Button icon="bi bi-send" class="" @click="chatStore.sendMessage(authStore.loggedInUser.id, chatStore.clickedUser.id, chatStore.messageToSend)" />
      </div>
    </template>
  </Drawer>
</template>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.message {
  max-width: 60%;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
}

.sent {
  background-color: #cce7ff;
  align-self: flex-end;
}

.received {
  background-color: #f1f1f1;
  align-self: flex-start;
}

small {
  font-size: 0.8rem;
  color: #888;
  text-align: right;
}
</style>
