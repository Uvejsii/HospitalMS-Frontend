<script setup>
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import {onMounted, ref} from "vue";
import {FilterMatchMode} from "@primevue/core/api";
import DeleteDepartmentButton from "./DeleteDepartmentButton.vue";

const departmentStore = useDepartmentStore()

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

onMounted(async () => {
  await departmentStore.getAllDepartments()
})
</script>

<template>
  <div class="card my-3 w-50 mx-auto">
    <DataTable v-model:filters="filters" :value="departmentStore.departments"
               paginator :rows="10" dataKey="id" filterDisplay="row"
               :loading="departmentStore.isLoading"
               :globalFilterFields="['name', 'location']">
      <template #empty> No departments found. </template>
      <template #loading> Loading department data. Please wait. </template>

      <Column field="name" header="Department" :showFilterMenu="false" style="max-width: 12rem;">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" style="width: 11rem;" type="text"
                     @input="filterCallback()" placeholder="Search by name" />
        </template>
      </Column>

      <Column field="location" header="Location" :showFilterMenu="false" style="max-width: 14rem;">
        <template #body="{ data }">
          {{ data.location }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText v-model="filterModel.value" type="text"
                     @input="filterCallback()" placeholder="Search by location" />
        </template>
      </Column>

      <Column header="Actions" style="max-width: 8rem; text-align: center;">
        <template #body="{ data }">
          <div class="d-flex justify-content-between">
            <Button data-bs-toggle="modal" data-bs-target="#editDepartmentModal"
                    icon="bi bi-pencil" severity="warn" size="small" rounded variant="outlined" aria-label="Edit"
                    @click="departmentStore.startEditDepartment(data)"/>
            <DeleteDepartmentButton :department="data" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>