<script setup>
import {Toast} from "primevue";
import Header from "./components/Header.vue";
import {useToast} from "primevue/usetoast";
import * as signalR from "@microsoft/signalr";
import {onMounted} from "vue";

const toast = useToast()
let connection;

onMounted(() => {
  connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5233/notificationHub", {
        withCredentials: true
      })
      .withAutomaticReconnect()
      .build();

  connection.start().then(() => {
    console.log("Connected to SignalR Hub");

    connection.on("ReceiveMessage", (message) => {
      console.log("New notification received:", message);
      toast.add({ severity: 'success', summary: message, life: 6000 });
    });
  }).catch(err => console.error("SignalR connection error:", err));
})
</script>

<template>
  <Toast/>
  <Header />
  <div class="container">
    <RouterView/>
  </div>
</template>

<style scoped>

</style>
