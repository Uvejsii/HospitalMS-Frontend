<script setup>
import {onMounted} from "vue";
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import DoctorCard from "../components/DoctorCard.vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

const doctorStore = useDoctorStore()

onMounted( async () => {
  await doctorStore.getAllDoctors()
})
</script>

<template>
  <h5>
    <RouterLink to="/admin" class="text-decoration-none text-dark">
      <Button icon="bi bi-arrow-right" label="Go to Admin" severity="info"/>
    </RouterLink>
  </h5>
  <div v-if="doctorStore.isLoading || doctorStore.isError">
    <ProgressSpinner />
  </div>
  <div v-else class="row gap-3">
    <DoctorCard v-for="doctor in doctorStore.doctors" :key="doctor.id" :doctor="doctor" />
  </div>
</template>

<style scoped>

</style>