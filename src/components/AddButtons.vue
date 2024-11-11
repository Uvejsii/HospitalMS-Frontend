<script setup>
import SpeedDial from "primevue/speeddial";
import {ref} from "vue";

const items = ref([
  {
    label: 'Doctor',
    modal: '#addDoctorModal'
  },
  {
    label: 'Department',
    modal: '#addDepartmentModal'
  },
])
</script>

<template>
  <div class="add-buttons position-relative">
    <SpeedDial :model="items" direction="left" style="position: absolute; top: calc(50% - 1.27rem); right: 0">
      <template #item="{ item, toggleCallback }">
        <div data-bs-toggle="modal" :data-bs-target="item.modal"
             class="add-buttons-label flex flex-col items-center justify-between gap-2 p-2 border
               rounded border-surface-200 dark:border-surface-700 w-20 cursor-pointer
               bg-green-100 hover:bg-green-200"
             @click="toggleCallback">
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