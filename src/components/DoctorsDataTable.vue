<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import InputText from "primevue/inputtext"
import Select from "primevue/select";
import Tag from "primevue/tag"
import Column from "primevue/column"
import MultiSelect from "primevue/multiselect";
import DataTable from "primevue/datatable";
import Button from "primevue/button"
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import DeleteDoctorButton from "./DeleteDoctorButton.vue";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()

const filters = ref({
  firstName: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  phoneNumber: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  departament: { value: null, matchMode: FilterMatchMode.IN},
  isAvailable: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const statuses = ref([
  { label: "Available", value: true },
  { label: "Unavailable", value: false },
]);

onMounted(async () => {
 await doctorStore.getAllDoctors()
});

const getSeverity = (status) => {
  return status ? 'success' : 'danger';
}
</script>

<template>
  <div class="card my-3">
    <DataTable v-model:filters="filters" :value="doctorStore.doctors"
               paginator :rows="10" dataKey="id" filterDisplay="row"
               :loading="doctorStore.isLoading"
               :globalFilterFields="['firstName', 'email', 'phoneNumber', 'departament.id', 'isAvailable']">
      <template #empty> No doctors found. </template>
      <template #loading> Loading doctors data. Please wait. </template>

      <Column field="firstName" header="Doctor" :showFilterMenu="false" style="max-width: 12rem;">
        <template #body="{ data }">
          {{ data.firstName }} {{ data.lastName }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" style="width: 11rem;" type="text"
                     @input="filterCallback()" placeholder="Search by name" />
        </template>
      </Column>

      <Column field="email" header="Email" :showFilterMenu="false" style="max-width: 14rem;">
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text"
                     @input="filterCallback()" placeholder="Search by email" />
        </template>
      </Column>

      <Column field="phoneNumber" header="Phone No" :showFilterMenu="false" style="max-width: 13rem">
        <template #body="{ data }">
          {{ data.phoneNumber }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text" style="width: 2rem" class="w-100"
                     @input="filterCallback()" placeholder="Search by Phone No" />
        </template>
      </Column>

      <Column header="Department" field="departament" :showFilterMenu="false" style="max-width: 12rem">
        <template #body="{ data }">
          <span>{{ data.departament.name }}</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect v-model="filterModel.value" @change="filterCallback()"
                       :options="departmentStore.departments" optionLabel="name"
                       placeholder="Select department" :maxSelectedLabels="1" style="width: 11.5rem;" />
        </template>
      </Column>

      <Column field="isAvailable" header="Status" :showFilterMenu="false" style="max-width: 12rem">
        <template #body="{ data }">
          <Tag :value="data.isAvailable ? 'Available' : 'Unavailable'"
               :severity="getSeverity(data.isAvailable)" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select v-model="filterModel.value" @change="filterCallback()"
                  :options="statuses" optionValue="value" optionLabel="label"
                  placeholder="Select status" style="min-width: 12rem" :showClear="true">
            <template #option="slotProps">
              <Tag :value="slotProps.option.label" :severity="getSeverity(slotProps.option.value)" />
            </template>
          </Select>
        </template>
      </Column>

      <Column header="Actions" style="max-width: 8rem; text-align: center;">
        <template #body="{ data }">
          <div class="d-flex justify-content-between">
            <Button icon="bi bi-pencil" severity="warn" size="small" rounded variant="outlined" aria-label="Edit"
                    @click="doctorStore.startEditDoctor(data); doctorStore.showEditDocForm = true"/>
            <DeleteDoctorButton :doctor="data" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
</style>
