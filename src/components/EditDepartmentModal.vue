<script setup>
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Form from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import {computed, ref} from "vue";

const departmentStore = useDepartmentStore()
const editDepFormRef = ref(null);

const initialValues = computed(() => ({
  depEdit: departmentStore.editDepartmentData.name || '',
  locationEdit: departmentStore.editDepartmentData.location || '',
}));

const resolver = ref(
    zodResolver(
        z.object({
          depEdit: z.string().min(1, { message: "Name is required" }),
          locationEdit: z.string().min(1, { message: "Location is required" }),
        })
    )
);

const closeModal = () => {
  departmentStore.showEditDepForm = false;
  resetForm()
}

const resetForm = () => {
  departmentStore.editDepartmentData.name = "";
  departmentStore.editDepartmentData.location = "";

  if (editDepFormRef.value?.reset) {
    editDepFormRef.value.reset();
  }
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    departmentStore.editDepartment();
    closeModal()
  }
};

</script>

<template>
  <div v-if="departmentStore.showEditDepForm" class="modal-container">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <p class="m-0 text-center fw-semibold fs-4 mt-3 text-success">Edit Department</p>
        <Form id="editDepForm" ref="editDepFormRef" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="modal-body p-4">
            <div>
              <FloatLabel variant="on">
                <InputText name="depEdit" id="editDepName" type="text" class="form-control"
                           autocomplete="off"
                           v-model.trim="departmentStore.editDepartmentData.name" />
                <label :class="{'pb-3': $form.depEdit?.invalid}" for="depEdit">Name</label>
                <Message v-if="$form.depEdit?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.depEdit.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="my-3">
              <FloatLabel variant="on">
                <InputText name="locationEdit" id="editDepLocation" type="text" class="form-control"
                           autocomplete="off"
                           v-model.trim="departmentStore.editDepartmentData.location" />
                <label :class="{'pb-3': $form.locationEdit?.invalid}" for="locationEdit">Location</label>
                <Message v-if="$form.locationEdit?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.locationEdit.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <Button type="submit" label="Save Changes" />
              <Button label="Close" severity="secondary" @click="closeModal"/>
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