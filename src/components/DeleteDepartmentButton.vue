<script setup>
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import Button from "primevue/button";

const departmentStore = useDepartmentStore()
const {department} = defineProps(['department'])

const confirm = useConfirm();
const toast = useToast()

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: `Delete ${department.name}?`,
    message: 'Please confirm to proceed.',
    accept: () => {
      departmentStore.deleteDepartment(department.id)
    },
    reject: () => {
      toast.add({ severity: 'info', summary: 'You Have Rejected', life: 1500 });
    }
  });
};
</script>

<template>
  <Button @click="requireConfirmation()"
          icon="bi bi-trash" severity="danger" size="small" rounded variant="outlined" aria-label="Delete"/>
</template>

<style scoped>

</style>