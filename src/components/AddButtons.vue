<script setup>
import SpeedDial from "primevue/speeddial";
import {ref} from "vue";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";

const departmentStore = useDepartmentStore()
const doctorStore = useDoctorStore()

const items = ref([
  {
    label: 'Doctor',
    modal: doctorStore.showAddDocForm
  },
  {
    label: 'Department',
    modal: departmentStore.showAddDepForm
  },
])

const toggleModal = (modalKey) => {
  if (modalKey === 'department') {
    departmentStore.showAddDepForm = !departmentStore.showAddDepForm;
  } else if (modalKey === 'doctor') {
    doctorStore.showAddDocForm = !doctorStore.showAddDocForm;
  }
}
</script>

<template>
  <div class="add-buttons position-relative">
    <SpeedDial :model="items" direction="left" style="position: absolute; top: calc(50% - 1.27rem); right: 0">
      <template #item="{ item, toggleCallback }">
        <div class="add-buttons-label flex flex-col items-center justify-between gap-2 p-2 border
               rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer border-success-subtle
               bg-green-100 hover:bg-green-200 fw-semibold"
             @click="(e) => {toggleCallback(e); toggleModal(item.label.toLowerCase())}">
          <span>{{ item.label }}</span>
        </div>
      </template>
    </SpeedDial>
  </div>
</template>

<style scoped>
.add-buttons-label {
  cursor: pointer;
  background-color: #ebfcf2;
}

.add-buttons-label:hover {
  background-color: #d1f8e1;
  transition: .2s ease-in-out;
}
</style>
