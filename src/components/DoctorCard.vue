<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

const {doctor} = defineProps(['doctor'])
</script>

<template>
  <Card class="col-3 mx-auto p-0 my-3 overflow-hidden shadow">
    <template #header>
      <img :src="doctor.imageFilePath" alt="Doctors picture" class="doc-image" />
    </template>
    <template #title>
      <RouterLink class="text-decoration-none text-dark" :to="`/doctor/${doctor.id}`">
        {{ doctor.firstName }} {{ doctor.lastName }}
      </RouterLink>
    </template>
    <template #subtitle>
      {{ doctor.departament.name }}
    </template>
    <template #content>
      <p class="m-0 description">
        <b>Dr. {{ doctor.firstName }} {{ doctor.lastName }}</b> brings
        <b>
          {{ doctor.yearsOfExperience }}<span>{{ doctor.yearsOfExperience > 1 ? ' years' : ' year' }}</span>
        </b>
        of professional experience and specializes in <b>{{ doctor.departament.name }}</b>. This department is located at <b>{{ doctor.departament.location }}</b>.
      </p>
    </template>
    <template #footer>
      <RouterLink :to="`/doctor/${doctor.id}`">
        <Button label="View Doctor" class="w-100"/>
      </RouterLink>
    </template>
  </Card>
</template>

<style scoped>
.doc-image {
  width: 100%;
  height: 230px;
  object-fit: fill;
}

.description {
  font-size: 14px;
}
</style>