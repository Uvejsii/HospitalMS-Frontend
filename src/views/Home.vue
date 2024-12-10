<script setup>
import {onMounted} from "vue";
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useAuthStore} from "../store/auth/useAuthStore.js";
import DoctorCard from "../components/DoctorCard.vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

const doctorStore = useDoctorStore()
const authStore = useAuthStore()

onMounted( async () => {
  await doctorStore.getAllDoctors()
  if (authStore.getUserFromLocalStorage()) {
    await authStore.pingAuth()
  }
})

</script>

<template>
  <div class="my-4">
    <div class="d-flex justify-content-between">
      <h5>
        <RouterLink to="/admin/doctorsDashboard" class="text-decoration-none text-dark">
          <Button icon="bi bi-arrow-right" label="Go to Admin" severity="info"/>
        </RouterLink>
      </h5>
      <p class="m-0" v-if="authStore.loggedInUser.firstName">
        {{ authStore.loggedInUser.firstName + ' ' + authStore.loggedInUser.lastName }}
      </p>
      <Button v-if="authStore.loggedInUser.firstName"
              label="logout" severity="danger" @click="authStore.logOut()" />
      <RouterLink to="/register" class="text-decoration-none text-dark">
        <Button icon="bi bi-person-circle" />
      </RouterLink>
    </div>
    <div v-if="doctorStore.isLoading || doctorStore.isError">
      <ProgressSpinner />
    </div>
    <div v-else class="row gap-3">
      <DoctorCard v-for="doctor in doctorStore.doctors" :key="doctor.id" :doctor="doctor" />
    </div>
  </div>
</template>

<style scoped>

</style>