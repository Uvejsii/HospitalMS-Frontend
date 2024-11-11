<script setup>
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const departmentStore = useDepartmentStore()
</script>

<template>
  <div class="modal fade" id="addDepartmentModal" tabindex="-3"
       aria-labelledby="addDepartmentModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addDepartmentModalLabel">Add a Department</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <FloatLabel variant="on">
            <InputText id="depName" type="text" class="form-control my-3" autocomplete="off"
                       v-model="departmentStore.addDepartmentData.name" />
            <label for="depName">Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="depLocation" type="text" class="form-control my-3" autocomplete="off"
                       v-model="departmentStore.addDepartmentData.location" />
            <label for="depLocation">Location</label>
          </FloatLabel>
        </div>
        <div class="modal-footer">
          <Button data-bs-dismiss="modal" label="Add Department" @click="departmentStore.addDepartment()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>