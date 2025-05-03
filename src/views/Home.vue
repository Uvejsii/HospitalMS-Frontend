<script setup>
import {onMounted} from "vue";
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useAuthStore} from "../store/auth/useAuthStore.js";
import DoctorCard from "../components/DoctorCard.vue";
import ProgressSpinner from "primevue/progressspinner";

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