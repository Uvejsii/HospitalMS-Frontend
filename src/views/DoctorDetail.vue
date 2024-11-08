<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useDoctorStore } from "../store/doctor/useDoctorStore.js";
import Button from 'primevue/button'
import Skeleton from "primevue/skeleton";

const route = useRoute()
const doctorStore = useDoctorStore()

onMounted(async () => {
  await doctorStore.getDoctorById(route.params.id)
})
</script>

<template>
  <div class="container py-5">
      <div v-if="doctorStore.isLoading" class="rounded border border-1 p-5">
        <div class="d-flex mb-4">
          <Skeleton shape="circle" size="4rem" class="ms-2"></Skeleton>
        </div>
        <div>
          <Skeleton width="10rem" class="mb-2"></Skeleton>
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton height=".5rem"></Skeleton>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="d-flex justify-content-between mt-4">
          <Skeleton width="4rem" height="2rem"></Skeleton>
          <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
      </div>
    <div v-else class="card mx-auto shadow-lg p-4" style="max-width: 600px;">
      <RouterLink class="text-decoration-none" to="/">
        <Button icon="bi bi-arrow-left" label="Back" class="mb-3" />
      </RouterLink>

      <div class="d-flex align-items-center mb-4">
        <img
            :src="doctorStore.doctor.imageUrl || 'https://via.placeholder.com/150'"
            alt="Doctor profile picture"
            class="rounded-circle shadow-sm me-3"
            style="width: 100px; height: 100px; object-fit: cover;"
        />
        <div>
          <h2 class="h5 mb-0 fw-bold text-dark">{{ doctorStore.doctor.firstName }} {{ doctorStore.doctor.lastName }}</h2>
          <h6 class="text-muted">
            {{ doctorStore.doctor.yearsOfExperience }}
            <span>{{ doctorStore.doctor.yearsOfExperience > 1 ? 'years' : 'year' }}</span> of experience
          </h6>
        </div>
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex align-items-center">
          <i class="bi bi-envelope-fill me-2 text-primary"></i>
          <span>{{ doctorStore.doctor.email }}</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <i class="bi bi-telephone-fill me-2 text-success"></i>
          <span>{{ doctorStore.doctor.phoneNumber }}</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <i class="bi bi-cash-stack me-2 text-warning"></i>
          <span>Consultation Fee: ${{ doctorStore.doctor.consultationFee }}</span>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <i class="bi bi-hospital-fill me-2 text-danger"></i>
          <span>Department: {{ doctorStore.doctor.departament?.name || 'Not available' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
}

.doctor-card {
  border-radius: 8px;
  background-color: #ffffff;
}

.doctor-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.doctor-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.list-group-item {
  font-size: 1rem;
  padding: 0.8rem 1.25rem;
  border: none;
}

.list-group-item i {
  color: #2c3e50;
  font-size: 1.2rem;
}

.list-group-item:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}

</style>
