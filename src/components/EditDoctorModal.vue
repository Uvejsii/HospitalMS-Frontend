<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import Select from "primevue/select";
import RadioButton from "primevue/radiobutton";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import FileUpload from "primevue/fileupload";
import Form from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import {computed, ref} from "vue";
import Message from "primevue/message";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()

const editDocFormRef = ref(null);

const initialValues = computed(() => ({
  editDocFName: doctorStore.editDoctorData.firstName,
  editDocLName: doctorStore.editDoctorData.lastName,
  editDocImage: doctorStore.editDoctorData.image,
  editDocImgFileName: doctorStore.editDoctorData.imageFileName,
  editDocYearsOfExperience: doctorStore.editDoctorData.yearsOfExperience,
  editDocEmail: doctorStore.editDoctorData.email,
  editDocPhoneNumber: doctorStore.editDoctorData.phoneNumber,
  editDocConsultationFee: doctorStore.editDoctorData.consultationFee,
  editDocIsAvailable: doctorStore.editDoctorData.isAvailable,
  editDocDepartamentId: doctorStore.editDoctorData.departamentId,
}))

const allowedExtensions = ['jpg', 'jpeg', 'png']

const resolver = ref(
    zodResolver(
        z.object({
          editDocFName: z.string().min(1, { message: "First Name is required" }),
          editDocLName: z.string().min(1, { message: "Last Name is required" }),
          editDocImage: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024,
              {message: "File must be less than 10MB"}).refine(
              (file) => allowedExtensions.includes(file.name.split(".").pop().toLowerCase()),
              { message: "File must be .jpg, .jpeg or .png" }
          ).nullable().optional(),
          editDocImgFileName: z.string().min(1, { message: "Image Name is required" }),
          editDocYearsOfExperience: z.number().gt(0, { message: "Must be a greater than 0" })
              .lt(100, {message: "Must be less than 100"}),
          editDocEmail: z.string().min(1, { message: "Email is required" })
              .email({ message: 'Invalid email address.' }),
          editDocPhoneNumber: z.string().min(12, { message: "Phone Number is required" }),
          editDocConsultationFee: z.number({ message: "Must be a number" }).positive(),
          editDocIsAvailable: z.boolean(),
          editDocDepartamentId: z.number({ message: "Department is required" }).positive(),
        })
    )
)

const onFileSelect = (event) => {
  const file = event.files[0]
  if (file) {
    const fileExtension = file.name.split('.').pop().toLowerCase()
    if (file.size > 10 * 1024 * 1024) {
      return doctorStore.fileSizeAbove10Mb()
    }
    if(!allowedExtensions.includes(fileExtension)) {
      return doctorStore.invalidFileType()
    }

    doctorStore.editDoctorData.image = file;
  }
}

const closeModal = () => {
  doctorStore.showEditDocForm = false
  resetForm()
}

const resetForm = () => {
  if (editDocFormRef.value?.reset) {
    editDocFormRef.value.reset();
  }
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    doctorStore.editDoctor()
    closeModal()
  }
}
</script>

<template>
  <div v-if="doctorStore.showEditDocForm" id="editDoctorModal" class="modal-container">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <p class="m-0 text-center fw-semibold fs-4 mt-3 text-success">Edit Doctor</p>
        <Form id="editDoctorForm" ref="editDocFormRef" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="modal-body p-4">
            <div class="d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center w-50"  style="font-size: 13px;">
                <img :src="doctorStore.getImageUrlWithCache(doctorStore.editDoctorData.imageFilePath)"
                     alt="dr image" style="width: 35%; height: 65px; object-fit: cover;" class="rounded-circle shadow">
                <FileUpload name="editDocImage" mode="basic" class="p-button-outlined" chooseLabel="Change Img"
                            accept="image/*" :maxFileSize="10000000" @select="onFileSelect" style="font-size: 13px;">
                  <label :class="{'pb-3': $form.editDocImage?.invalid}" for="editDocImage">Image Name</label>
                  <Message v-if="$form.editDocImage?.invalid" severity="error" size="small" variant="simple">
                    {{ $form.editDocImage.error?.message }}
                  </Message>
                </FileUpload>
              </div>
              <FloatLabel variant="on" class="">
                <InputText name="editDocImgFileName" id="editImgFileName" type="text" class="form-control w-100"
                           autocomplete="off" v-model.trim="doctorStore.editDoctorData.imageFileName" />
                <label :class="{'pb-3': $form.editDocImgFileName?.invalid}" for="editImgFileName">Image Name</label>
                <Message v-if="$form.editDocImgFileName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocImgFileName.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
              <FloatLabel variant="on">
                <InputText name="editDocFName" id="editFName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.editDoctorData.firstName" />
                <label :class="{'pb-3': $form.editDocFName?.invalid}" for="editFName">Dr. First Name</label>
                <Message v-if="$form.editDocFName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocFName.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputText name="editDocLName" id="editLName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.editDoctorData.lastName" />
                <label :class="{'pb-3': $form.editDocLName?.invalid}" for="editLName">Dr. Last Name</label>
                <Message v-if="$form.editDocLName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocLName.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
              <FloatLabel variant="on">
                <InputNumber name="editDocYearsOfExperience" id="editYrsExp"
                             v-model="doctorStore.editDoctorData.yearsOfExperience" fluid />
                <label :class="{'pb-3': $form.editDocYearsOfExperience?.invalid}" for="editYrsExp">
                  Years of Experience
                </label>
                <Message v-if="$form.editDocYearsOfExperience?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocYearsOfExperience.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputNumber name="editDocConsultationFee" inputId="currency-germany" id="editConsFee"
                             mode="currency" currency="EUR" locale="de-DE"
                             v-model.trim="doctorStore.editDoctorData.consultationFee" fluid />
                <label :class="{'pb-3': $form.editDocConsultationFee?.invalid}" for="editConsFee">
                  Consultation Fee
                </label>
                <Message v-if="$form.editDocConsultationFee?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocConsultationFee.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
              <FloatLabel variant="on">
                <InputText name="editDocEmail" id="editEmail" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.editDoctorData.email" />
                <label :class="{'pb-3': $form.editDocEmail?.invalid}" for="editEmail">Email</label>
                <Message v-if="$form.editDocEmail?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocEmail.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputText name="editDocPhoneNumber" id="editPhoneNo" type="text" class="form-control"
                           autocomplete="off" v-model.trim="doctorStore.editDoctorData.phoneNumber" />
                <label :class="{'pb-3': $form.editDocPhoneNumber?.invalid}" for="editPhoneNo">Phone Number</label>
                <Message v-if="$form.editDocPhoneNumber?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocPhoneNumber.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between my-4">
              <div class="d-flex gap-3 align-items-center">
                <span class="m-0">Available:</span>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton name="editDocIsAvailable" v-model="doctorStore.editDoctorData.isAvailable"
                               input-id="addOption1" :value="true" />
                  <label for="addOption1">Yes</label>
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton name="editDocIsAvailable" v-model="doctorStore.editDoctorData.isAvailable"
                               input-id="addOption2" :value="false" />
                  <label for="addOption2">No</label>
                </div>
                <Message v-if="$form.editDocIsAvailable?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocIsAvailable.error?.message }}
                </Message>
              </div>
              <div class="w-50 ps-1">
                <Select name="editDocDepartamentId" v-model="doctorStore.editDoctorData.departamentId"
                        :options="departmentStore.departments" optionValue="id" showClear optionLabel="name"
                        appendTo="#editDoctorModal" placeholder="Select Department" class="w-100" />
                <Message v-if="$form.editDocDepartamentId?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.editDocDepartamentId.error?.message }}
                </Message>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <Button type="submit" label="Save Changes" />
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