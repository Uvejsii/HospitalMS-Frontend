<script setup>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "../store/auth/useAuthStore.js";
import { useChatStore } from "../store/chat/useChatStore.js";
import Button from "primevue/button";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import SelectedUserChatSideBar from "../components/SelectedUserChatSideBar.vue";

const authStore = useAuthStore();
const chatStore = useChatStore();

const searchQuery = ref("");

const filteredUsers = computed(() => {
  return authStore.allUsers
      .filter((user) => user.id !== authStore.loggedInUser?.id)
      .filter((user) => {
        if (!searchQuery.value.trim()) return true;
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.value.trim().toLowerCase());
      });
});

onMounted(() => {
  authStore.getAllUsers();
});
</script>

<template>
  <div class="container py-4">
    <h3 class="mb-4 text-center fw-bold text-primary">Select Who You Want to Chat With</h3>
    <div class="mb-4 text-center">
      <span class="p-input-icon-left w-100 w-md-50 d-inline-block">
        <InputText
            v-model="searchQuery"
            placeholder="Search users..."
            class="w-25 p-inputtext-lg"
        />
      </span>
    </div>
    <div class="row">
      <div
          class="col-md-4 mb-4"
          v-for="(user, index) in filteredUsers"
          :key="user.id"
      >
        <Card class="user-card shadow-sm border-0 h-100">
          <template #title>
            <div class="d-flex align-items-center gap-3">
              <Avatar
                  size="large"
                  shape="circle"
                  class="bg-primary text-white"
              />
              <span class="fs-5 fw-semibold">
                {{ user.firstName }} {{ user.lastName }}
              </span>
            </div>
          </template>
          <template #content>
            <p class="text-muted mb-2">User #{{ index + 1 }}</p>
            <Divider />
            <Button
                label="Start Chat"
                icon="pi pi-comments"
                class="p-button-outlined w-100"
                @click="chatStore.getClickedUserToChat(user)"
            />
          </template>
        </Card>
      </div>
      <div class="col-md-8 mt-4 mt-md-0">
        <SelectedUserChatSideBar />
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}
</style>
