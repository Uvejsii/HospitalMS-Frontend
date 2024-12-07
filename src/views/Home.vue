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
  <div class="my-4">
    <div class="d-flex justify-content-between">
      <h5>
        <RouterLink to="/admin/doctorsDashboard" class="text-decoration-none text-dark">
          <Button icon="bi bi-arrow-right" label="Go to Admin" severity="info"/>
        </RouterLink>
      </h5>
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