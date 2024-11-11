<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import Select from "primevue/select";
import RadioButton from "primevue/radiobutton";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()

</script>

<template>
  <div class="modal fade" id="editDoctorModal" tabindex="-2"
       aria-labelledby="editDoctorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editDoctorModalLabel">Edit Doctor</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <FloatLabel variant="on">
            <InputText id="editFName" type="text" class="form-control" autocomplete="off"
                   v-model="doctorStore.editDoctorData.firstName" />
              <label for="editFName">Dr. First Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editLName" type="text" class="form-control my-3" autocomplete="off"
                   v-model="doctorStore.editDoctorData.lastName" />
            <label for="editLName">Dr. Last Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editImgUrl" type="text" class="form-control" autocomplete="off"
                   v-model="doctorStore.editDoctorData.imageIrl" />
            <label for="editImgUrl">Image Url</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editYrsExp" type="number" class="form-control my-3" autocomplete="off"
                   v-model="doctorStore.editDoctorData.yearsOfExperience" />
            <label for="editYrsExp">Years of Experience</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editEmail" type="text" class="form-control" autocomplete="off"
                   v-model="doctorStore.editDoctorData.email" />
            <label for="editEmail">Email</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editPhoneNo" type="text" class="form-control my-3" autocomplete="off"
                   v-model="doctorStore.editDoctorData.phoneNumber" />
            <label for="editPhoneNo">Phone Number</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="editConsFee" type="number" class="form-control" autocomplete="off"
                   v-model="doctorStore.editDoctorData.consultationFee" />
            <label for="editConsFee">Consultation Fee</label>
          </FloatLabel>
          <div class="d-flex justify-content-between my-3">
            <Select v-model="doctorStore.editDoctorData.departamentId"
                    :options="departmentStore.departments" optionValue="id" showClear optionLabel="name"
                    appendTo="#editDoctorModal" placeholder="Select a Department" />
            <div class="d-flex gap-4 align-items-center">
              <span class="m-0">Available:</span>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton v-model="doctorStore.editDoctorData.isAvailable" input-id="option1" name="yes" :value="true" />
                  <label for="option1">Yes</label>
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton v-model="doctorStore.editDoctorData.isAvailable" input-id="option2" name="no" :value="false" />
                  <label for="option2">No</label>
                </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <Button label="Save Changes" data-bs-dismiss="modal" @click="doctorStore.editDoctor()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>