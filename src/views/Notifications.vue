<script setup>
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";
import AutoComplete from "primevue/autocomplete";
import {useAuthStore} from "../store/auth/useAuthStore.js";

const authStore = useAuthStore();
</script>

<template>
  <div class="notifications-wrapper">
    <div class="notification-form">
      <FloatLabel>
        <InputText id="all-docs" v-model="authStore.notificationToAllDoctors" />
        <label for="all-docs">Send to all doctors</label>
      </FloatLabel>
      <Button label="Send" @click="authStore.sendNotificationToAllDoctors(authStore.notificationToAllDoctors)" />
    </div>
    <div class="notification-form">
      <FloatLabel>
        <InputText id="all-admins" v-model="authStore.notificationToAllAdmins" />
        <label for="all-admins">Send to all admins</label>
      </FloatLabel>
      <Button label="Send" severity="info" @click="authStore.sendNotificationToAllAdmins(authStore.notificationToAllAdmins)" />
    </div>
    <div class="notification-form">
      <FloatLabel>
        <InputText id="all-users" v-model="authStore.notificationToAllUsers" />
        <label for="all-users">Send to all users</label>
      </FloatLabel>
      <Button label="Send" severity="warn" @click="authStore.sendNotificationToAllUsers(authStore.notificationToAllUsers)" />
    </div>
    <div class="notification-form">
      <FloatLabel>
        <AutoComplete
            v-model="authStore.selectedUser"
            :suggestions="authStore.usersByName"
            optionLabel="email"
            @complete="authStore.getUsersByName($event)"
            :delay="700"
        />
        <label>Search user to send</label>
      </FloatLabel>
      <InputText v-model="authStore.notificationToUserByEmail" />
      <Button label="Send" severity="contrast" @click="authStore.sendNotificationToUserByEmail(authStore.selectedUser.email, authStore.notificationToUserByEmail)" />
    </div>
  </div>
</template>

<style scoped>
.notifications-wrapper {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 30px;
  background: linear-gradient(145deg, #f4f6f9, #ffffff);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
}

.notification-form {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease-in-out;
}

.notification-form:hover {
  transform: scale(1.01);
}
</style>