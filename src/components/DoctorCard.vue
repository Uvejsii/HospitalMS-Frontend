<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";

const {doctor} = defineProps(['doctor'])
const doctorStore = useDoctorStore()
</script>

<template>
  <Card class="col-3 mx-auto">
    <template #title>
      <RouterLink class="text-decoration-none text-dark" :to="`/doctor/${doctor.id}`">
        {{ doctor.firstName }} {{ doctor.lastName }}
      </RouterLink>
    </template>
    <template #subtitle>
      {{ doctor.departament.name }}
    </template>
    <template #footer>
      <RouterLink :to="`/doctor/${doctor.id}`">
        <Button label="View Doctor" class="w-100"/>
      </RouterLink>
      <div class="d-flex gap-3 mt-3">
        <Button label="Edit" class="w-100" severity="warn" data-bs-toggle="modal" data-bs-target="#editModal" @click="doctorStore.startEditDoctor(doctor)"/>
        <Button label="Delete" class="w-100" severity="danger" @click="doctorStore.deleteDoctor(doctor.id)" />
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>