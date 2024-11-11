<script setup>
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
</script>

<template>
  <ConfirmDialog group="headless">
    <template #container="{ message, acceptCallback, rejectCallback }">
      <div class="d-flex flex-column align-items-center p-5 bg-light rounded">
        <div class="rounded-circle bg-danger text-white d-flex justify-content-center
         align-items-center" style="height: 120px; width: 120px; margin-top: -110px;">
          <i class="bi bi-question fs-1"></i>
        </div>
        <span class="fw-bold fs-4 mt-3 mb-2">{{ message.header }}</span>
        <p class="mb-3 text-secondary">{{ message.message }}</p>
        <div class="d-flex gap-2 mt-3">
          <Button label="Delete" severity="danger" @click="acceptCallback" class="w-100"></Button>
          <Button label="Cancel" severity="danger" outlined @click="rejectCallback" class="w-100"></Button>
        </div>
      </div>
    </template>
  </ConfirmDialog>
</template>

<style scoped>

</style>