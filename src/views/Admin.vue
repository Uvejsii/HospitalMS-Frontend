<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import Select from "primevue/select"
import {onMounted} from "vue";
import DoctorCard from "../components/DoctorCard.vue";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()

onMounted(async () => {
  await doctorStore.getAllDoctors()
  await departmentStore.getAllDepartments()
})
</script>

<template>
  <div class="d-flex justify-content-between">
    <RouterLink to="/">
      <Button icon="bi bi-arrow-left" label="Home" severity="info"/>
    </RouterLink>
    <div class="d-flex gap-3">
      <Button icon="bi bi-plus-circle" label="Add Doctor" severity="help"
              data-bs-toggle="modal" data-bs-target="#exampleModal"/>
      <Button icon="bi bi-plus-circle" label="Add Department" severity="contrast"
              data-bs-toggle="modal" data-bs-target="#addDepModal"/>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add a Doctor</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="dr.firstname" class="form-control" v-model="doctorStore.addDoctorData.firstName">
          <input type="text" placeholder="dr.lastname" class="form-control my-3" v-model="doctorStore.addDoctorData.lastName">
          <input type="text" placeholder="image url" class="form-control" v-model="doctorStore.addDoctorData.imageIrl">
          <input type="number" placeholder="years of exp" class="form-control my-3" v-model="doctorStore.addDoctorData.yearsOfExperience">
          <input type="text" placeholder="email" class="form-control" v-model="doctorStore.addDoctorData.email">
          <input type="text" placeholder="phone num" class="form-control my-3" v-model="doctorStore.addDoctorData.phoneNumber">
          <input type="number" placeholder="consultation fee" class="form-control" v-model="doctorStore.addDoctorData.consultationFee">
          <div class="d-flex my-3">
            <Select v-model="doctorStore.addDoctorData.departamentId" :options="departmentStore.departments" optionValue="id" showClear optionLabel="name" appendTo="#exampleModal" placeholder="Select a Department"/>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="doctorStore.addDoctor()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="editModal" tabindex="-2" aria-labelledby="editModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Doctor</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="dr.firstname" class="form-control" v-model="doctorStore.editDoctorData.firstName">
          <input type="text" placeholder="dr.lastname" class="form-control my-3" v-model="doctorStore.editDoctorData.lastName">
          <input type="text" placeholder="image url" class="form-control" v-model="doctorStore.editDoctorData.imageIrl">
          <input type="number" placeholder="years of exp" class="form-control my-3" v-model="doctorStore.editDoctorData.yearsOfExperience">
          <input type="text" placeholder="email" class="form-control" v-model="doctorStore.editDoctorData.email">
          <input type="text" placeholder="phone num" class="form-control my-3" v-model="doctorStore.editDoctorData.phoneNumber">
          <input type="number" placeholder="consultation fee" class="form-control" v-model="doctorStore.editDoctorData.consultationFee">
          <div class="d-flex my-3">
            <Select v-model="doctorStore.editDoctorData.departamentId" :options="departmentStore.departments" optionValue="id" showClear optionLabel="name" appendTo="#editModal" placeholder="Select a Department" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="doctorStore.editDoctor()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="addDepModal" tabindex="-3" aria-labelledby="addDepModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add a Department</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="Dep Name" class="form-control" v-model="departmentStore.addDepartmentData.name">
          <input type="text" placeholder="Location: eg. Building Z, 1st Floor" class="form-control my-3" v-model="departmentStore.addDepartmentData.location">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="departmentStore.addDepartment()">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="row gap-5 mt-4">
    <DoctorCard v-for="doctor in doctorStore.doctors" :key="doctor.id" :doctor="doctor" />
  </div>
</template>

<style scoped>

</style>