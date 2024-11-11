<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const {doctor} = defineProps(['doctor'])
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
    </template>
  </Card>
</template>

<style scoped>

</style>