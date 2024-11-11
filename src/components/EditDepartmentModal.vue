<script setup>
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const departmentStore = useDepartmentStore()
</script>

<template>
  <div class="modal fade" id="editDepartmentModal" tabindex="-4"
       aria-labelledby="editDepartmentModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editDepartmentModalLabel">Edit Department</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <FloatLabel variant="on">
            <InputText id="editDepName" type="text" class="form-control my-3" autocomplete="off"
                       v-model="departmentStore.editDepartmentData.name" />
            <label for="editDepName">Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editDepLocation" type="text" class="form-control my-3" autocomplete="off"
                       v-model="departmentStore.editDepartmentData.location" />
            <label for="editDepLocation">Location</label>
          </FloatLabel>
        </div>
        <div class="modal-footer">
          <Button label="Save Changes" data-bs-dismiss="modal" @click="departmentStore.editDepartment()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>