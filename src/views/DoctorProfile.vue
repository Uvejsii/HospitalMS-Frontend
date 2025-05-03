<script setup>
import {useAuthStore} from "../store/auth/useAuthStore.js";
import {onMounted} from "vue";

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.isDoctorOn) {
    await authStore.getLoggedInDoctor()
  }
})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100 ">
    <div v-if="authStore.isDoctorOn" class="text-center shadow p-5 rounded-2 border">
      <div class="d-flex align-items-center justify-content-center mb-4">
        <img
            :src="authStore.loggedInDoctor.imageFilePath"
            alt="Dr. Image"
            class="rounded-circle shadow img-thumbnail"
            style="width: 120px; height: 120px; object-fit: cover"
        />
        <div class="ms-3">
          <h5 class="text-primary fw-bold mb-0">
            Hello, Dr. {{ authStore.loggedInDoctor.firstName }} {{ authStore.loggedInDoctor.lastName }}
          </h5>
          <p class="text-muted mb-0">
            <i class="bi bi-envelope"></i> {{ authStore.loggedInDoctor.email }}
          </p>
        </div>
      </div>
      <div class="card border shadow-sm p-3 mb-4">
        <h6 class="text-secondary">
          <i class="bi bi-phone"></i> Phone:
          <span class="text-dark">{{ authStore.loggedInDoctor.phoneNumber }}</span>
        </h6>
        <h6 class="text-secondary">
          <i class="bi bi-envelope"></i> Email:
          <span class="text-dark">{{ authStore.loggedInDoctor.email }}</span>
        </h6>
      </div>
      <div class="card border shadow-sm p-3">
        <h6 class="text-secondary">
          <i class="bi bi-briefcase"></i> Department:
          <span class="text-dark">{{ authStore.loggedInDoctor.departament.name }}</span>
        </h6>
        <h6 class="text-secondary">
          <i class="bi bi-geo-alt"></i> Location:
          <span class="text-dark">{{ authStore.loggedInDoctor.departament.location }}</span>
        </h6>
        <h6 class="text-secondary">
          <i class="bi bi-cash-coin"></i> Consultation Fee:
          <span class="text-success">${{ authStore.loggedInDoctor.consultationFee }}</span>
        </h6>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
h5, h6 {
  line-height: 1.6;
}
</style>