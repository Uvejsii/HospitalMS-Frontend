<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import Select from "primevue/select";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()
</script>

<template>
  <div class="modal fade" id="addDoctorModal" tabindex="-1"
       aria-labelledby="addDoctorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addDoctorModalLabel">Add a Doctor</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <FloatLabel variant="on">
            <InputText id="fName" type="text" class="form-control" autocomplete="off"
                       v-model="doctorStore.addDoctorData.firstName" />
            <label for="fName">Dr. First Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="lName" type="text" class="form-control my-3" autocomplete="off"
                       v-model="doctorStore.addDoctorData.lastName" />
            <label for="lName">Dr. Last Name</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="imgUrl" type="text" class="form-control" autocomplete="off"
                       v-model="doctorStore.addDoctorData.imageIrl" />
            <label for="imgUrl">Image Url</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="yrsExp" type="number" class="form-control my-3" autocomplete="off"
                       v-model="doctorStore.addDoctorData.yearsOfExperience" />
            <label for="yrsExp">Years of Experience</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="email" type="text" class="form-control" autocomplete="off"
                       v-model="doctorStore.addDoctorData.email" />
            <label for="email">Email</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="phoneNo" type="text" class="form-control my-3" autocomplete="off"
                       v-model="doctorStore.addDoctorData.phoneNumber" />
            <label for="phoneNo">Phone Number</label>
          </FloatLabel>
          <FloatLabel variant="on">
            <InputText id="consFee" type="number" class="form-control" autocomplete="off"
                       v-model="doctorStore.addDoctorData.consultationFee" />
            <label for="consFee">Consultation Fee</label>
          </FloatLabel>
          <div class="d-flex justify-content-between my-3">
            <Select v-model="doctorStore.addDoctorData.departamentId"
                    :options="departmentStore.departments" optionValue="id" showClear optionLabel="name"
                    appendTo="#addDoctorModal" placeholder="Select Department"/>
            <div class="d-flex gap-4 align-items-center">
              <span class="m-0">Available:</span>
              <div class="d-flex justify-content-center gap-2">
                <RadioButton v-model="doctorStore.addDoctorData.isAvailable" input-id="addOption1" name="yes" :value="true" />
                <label for="addOption1">Yes</label>
              </div>
              <div class="d-flex justify-content-center gap-2">
                <RadioButton v-model="doctorStore.addDoctorData.isAvailable" input-id="addOption2" name="no" :value="false" />
                <label for="addOption2">No</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <Button label="Add Doctor" data-bs-dismiss="modal" @click="doctorStore.addDoctor()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>