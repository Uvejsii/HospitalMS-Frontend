<script setup>
import { useRoute } from "vue-router";
import {computed, onMounted, ref} from "vue";
import { useDoctorStore } from "../store/doctor/useDoctorStore.js";
import Button from 'primevue/button'
import Skeleton from "primevue/skeleton";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select"

const route = useRoute()
const doctorStore = useDoctorStore()

const date = ref(null);
const timeSlot = ref(null);

const today = new Date();

const timeSlots = computed(() => {
  const slots = [];
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date();
  end.setHours(17, 0, 0, 0);

  while (start < end) {
    const next = new Date(start.getTime() + 30 * 60 * 1000); // Add 30 minutes
    slots.push({
      label: `${start.toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit' })} - ${next.toLocaleTimeString([],
          { hour: '2-digit', minute: '2-digit' })
      }`,
      value: `${start.toISOString()} - ${next.toISOString()}`,
    });
    start.setMinutes(start.getMinutes() + 30);
  }
  return slots;
});

const formatTime = (timeRange) => {
  const [start, end] = timeRange.split(" - ");
  const startTime = new Date(start).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const endTime = new Date(end).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return `${startTime} - ${endTime}`;
};

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
      <RouterLink class="text-decoration-none w-25" to="/">
        <Button icon="bi bi-arrow-left" label="Back" class="w-100" />
      </RouterLink>
      <div class="d-flex align-items-center mt-4">
        <img
            :src="doctorStore.getImageUrlWithCache(doctorStore.doctor.imageFilePath)"
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
      <div class="d-flex justify-content-center gap-4 my-4">
        <div class="w-50">
          <FloatLabel variant="on">
            <DatePicker
                v-model="date"
                inputId="booking-date"
                :minDate="today"
                showIcon
                class="w-100"
            />
            <label for="booking-date">Select Date</label>
          </FloatLabel>
        </div>
        <div class="w-50">
          <FloatLabel variant="on">
            <Select v-model="timeSlot" :options="timeSlots" optionLabel="label"
                    optionValue="value" placeholder="Select Time" class="w-100"/>
            <label>Select Time</label>
          </FloatLabel>
        </div>
        <p v-if="date && timeSlot">
          Selected Date: {{ date.toLocaleDateString() }}
          <br />
          Selected Time: {{ formatTime(timeSlot) }}
        </p>
      </div>
      <div class="mb-4">
        <p class="m-0">
          <b>Dr. {{ doctorStore.doctor.firstName }} {{ doctorStore.doctor.lastName }}</b> brings
          <b>
            {{ doctorStore.doctor.yearsOfExperience }}
            <span>{{ doctorStore.doctor.yearsOfExperience > 1 ? ' years' : ' year' }}</span>
          </b>
          of professional experience and specializes in <b>{{ doctorStore.doctor.departament?.name }}</b>.
          This department is located at <b>{{ doctorStore.doctor.departament?.location }}</b>.
        </p>
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
