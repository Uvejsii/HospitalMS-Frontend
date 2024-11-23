<script setup>
import { useDepartmentStore } from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Form from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { ref } from "vue";

const departmentStore = useDepartmentStore();
const formRef = ref(null);

const initialValues = ref({
  dep: "",
  location: "",
});

const resolver = ref(
    zodResolver(
        z.object({
          dep: z.string().min(1, { message: "Name is required" }),
          location: z.string().min(1, { message: "Location is required" }),
        })
    )
);

const closeModal = () => {
  departmentStore.showAddDepForm = false;
  resetForm()
}

const resetForm = () => {
  departmentStore.addDepartmentData.name = "";
  departmentStore.addDepartmentData.location = "";

  if (formRef.value?.reset) {
    formRef.value.reset();
  }
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    departmentStore.addDepartment();
    closeModal()
  }
};

</script>

<template>
  <div v-if="departmentStore.showAddDepForm" class="modal-container">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <p class="m-0 text-center fw-semibold fs-4 mt-3 text-success">Add Department</p>
        <Form id="addDepForm" ref="formRef" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="modal-body p-4">
            <div>
              <FloatLabel variant="on">
                <InputText name="dep" id="depName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="departmentStore.addDepartmentData.name"/>
                <label :class="{'pb-3': $form.dep?.invalid}" for="depName">Name</label>
                <Message v-if="$form.dep?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.dep.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="my-3">
              <FloatLabel variant="on">
                <InputText name="location" id="depLocation" type="text" class="form-control" autocomplete="off"
                           v-model.trim="departmentStore.addDepartmentData.location"/>
                <label :class="{'pb-3': $form.location?.invalid}" for="depLocation">Location</label>
                <Message v-if="$form.location?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.location.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <Button type="submit" label="Add Department" />
              <Button label="Close" severity="secondary" @click="closeModal" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog-centered {
  max-width: 500px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
