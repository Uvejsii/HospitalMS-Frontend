<script setup>
import AddDoctorModal from "../components/AddDoctorModal.vue";
import EditDoctorModal from "../components/EditDoctorModal.vue";
import AddDepartmentModal from "../components/AddDepartmentModal.vue";
import AddButtons from "../components/AddButtons.vue";
import BackHomeButton from "../components/BackHomeButton.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";
import NavigateDashboards from "../components/NavigateDashboards.vue";
import EditDepartmentModal from "../components/EditDepartmentModal.vue";
</script>

<template>
  <ConfirmDelete />
  <div class="d-flex justify-content-between">
    <BackHomeButton />
    <NavigateDashboards />
    <AddButtons />
  </div>
  <AddDoctorModal />
  <EditDoctorModal />
  <AddDepartmentModal />
  <EditDepartmentModal />
  <RouterView/>
</template>

<style scoped>
</style>