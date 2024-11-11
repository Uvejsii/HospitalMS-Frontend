<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import Button from "primevue/button";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";

const doctorStore = useDoctorStore()
const {doctor} = defineProps(['doctor'])

const confirm = useConfirm();
const toast = useToast()

const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: `Delete Dr. ${doctor.firstName} ${doctor.lastName}?`,
    message: 'Please confirm to proceed.',
    accept: () => {
      doctorStore.deleteDoctor(doctor.id)
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