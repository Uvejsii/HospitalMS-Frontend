<script setup>
import {useDoctorStore} from "../store/doctor/useDoctorStore.js";
import {useDepartmentStore} from "../store/department/useDepartmentStore.js";
import Button from "primevue/button";
import Select from "primevue/select";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import FileUpload from "primevue/fileupload";
import RadioButton from "primevue/radiobutton";
import Message from "primevue/message";
import Form from "@primevue/forms/form";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import {onMounted, ref} from "vue";

const doctorStore = useDoctorStore()
const departmentStore = useDepartmentStore()

const addDocFromRef = ref(null)
const initialValues = ref({
  addDocFName: '',
  addDocLName: '',
  addDocImage: null,
  addDocImgFileName: '',
  addDocYearsOfExperience: 1,
  addDocEmail: '',
  addDocPhoneNumber: '',
  addDocConsultationFee: 0,
  addDocIsAvailable: true,
  addDocDepartamentId: null,
});

const allowedExtensions = ['jpg', 'jpeg', 'png']

const resolver = ref(
    zodResolver(
        z.object({
          addDocFName: z.string().min(1, { message: "First Name is required" }),
          addDocLName: z.string().min(1, { message: "Last Name is required" }),
          addDocImage: z.union([
            z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
              message: "File must be less than 10MB",
            }),
            z.literal(null, { message: "Image is required" }),
          ])
              .refine(
                  (file) =>
                      file === null ||
                      allowedExtensions.includes(file?.name.split(".").pop().toLowerCase()),
                  { message: "File must be .jpg, .jpeg, or .png" }
              ),
          addDocImgFileName: z.string().min(1, { message: "File Name is required" }),
          addDocYearsOfExperience: z.number().gt(0, { message: "Must be a greater than 0" })
              .lt(100, {message: "Must be less than 100"}),
          addDocEmail: z.string().min(1, { message: "Email is required" })
              .email({ message: 'Invalid email address.' }),
          addDocPhoneNumber: z.string().min(12, { message: "Phone Number is required" }),
          addDocConsultationFee: z.number({ message: "Must be a number" }).positive(),
          addDocIsAvailable: z.boolean(),
          addDocDepartamentId: z.number({ message: "Department is required" }).positive(),
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
    if (!allowedExtensions.includes(fileExtension)) {
      return doctorStore.invalidFileType()
    }

    doctorStore.addDoctorData.image = file;
    initialValues.value.addDocImage = file;
  }
}

const closeModal = () => {
  doctorStore.showAddDocForm = false;
  resetForm()
}

const resetForm = () => {
  doctorStore.addDoctorData = {
    firstName: '',
    lastName: '',
    image: null,
    imageFileName: '',
    yearsOfExperience: 1,
    email: '',
    consultationFee: 0,
    isAvailable: true,
    departamentId: null,
  };

  if (addDocFromRef.value?.reset) {
    addDocFromRef.value.reset();
  }
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    doctorStore.addDoctor()
    resetForm()
    closeModal()
  }
}

onMounted(async () => {
  await departmentStore.getAllDepartments()
})
</script>

<template>
  <div v-if="doctorStore.showAddDocForm" id="addDoctorModal" class="modal-container">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <p class="m-0 text-center fw-semibold fs-4 mt-3 text-success">Add Doctor</p>
        <Form id="addDoctorForm" ref="addDocFromRef" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="modal-body p-4">
            <div class="d-flex justify-content-between align-items-center my-4">
              <FloatLabel variant="on">
                <InputText name="addDocFName" id="fName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.addDoctorData.firstName" />
                <label :class="{'pb-3': $form.addDocFName?.invalid}" for="fName">Dr. First Name</label>
                <Message v-if="$form.addDocFName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocFName.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputText name="addDocLName" id="lName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.addDoctorData.lastName" />
                <label :class="{'pb-3': $form.addDocLName?.invalid}" for="lName">Dr. Last Name</label>
                <Message v-if="$form.addDocLName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocLName.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
              <FloatLabel variant="on">
                <InputText name="addDocEmail" id="email" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.addDoctorData.email" />
                <label :class="{'pb-3': $form.addDocEmail?.invalid}" for="email">Email</label>
                <Message v-if="$form.addDocEmail?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocEmail.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputText name="addDocPhoneNumber" id="phoneNo" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.addDoctorData.phoneNumber" />
                <label :class="{'pb-3': $form.addDocPhoneNumber?.invalid}" for="phoneNo">Phone Number</label>
                <Message v-if="$form.addDocPhoneNumber?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocPhoneNumber.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <FloatLabel variant="on">
                <InputNumber name="addDocYearsOfExperience" id="yrsExp"
                             v-model="doctorStore.addDoctorData.yearsOfExperience" fluid />
                <label :class="{'pb-3': $form.addDocYearsOfExperience?.invalid}" for="yrsExp">
                  Years of Experience
                </label>
                <Message v-if="$form.addDocYearsOfExperience?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocYearsOfExperience.error?.message }}
                </Message>
              </FloatLabel>
              <FloatLabel variant="on">
                <InputNumber name="addDocConsultationFee" inputId="currency-germany" id="consFee"
                             mode="currency" currency="EUR" locale="de-DE"
                           v-model.trim="doctorStore.addDoctorData.consultationFee" fluid />
                <label :class="{'pb-3': $form.addDocConsultationFee?.invalid}" for="consFee">Consultation Fee</label>
                <Message v-if="$form.addDocConsultationFee?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocConsultationFee.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between align-items-center my-4">
              <FileUpload name="addDocImage" mode="basic" class="p-button-outlined"
                          accept="image/*" :maxFileSize="10000000" :fileLimit="1" @select="onFileSelect" />
              <Message v-if="$form.addDocImage?.invalid" severity="error" size="small" variant="simple">
                {{ $form.addDocImage.error?.message }}
                {{ console.log($form.addDocImage) }}
              </Message>
              <FloatLabel variant="on">
                <InputText name="addDocImgFileName" id="fileName" type="text" class="form-control" autocomplete="off"
                           v-model.trim="doctorStore.addDoctorData.imageFileName" />
                <label :class="{'pb-3': $form.addDocImgFileName?.invalid}" for="fileName">Image Name</label>
                <Message v-if="$form.addDocImgFileName?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocImgFileName.error?.message }}
                </Message>
              </FloatLabel>
            </div>
            <div class="d-flex justify-content-between my-4">
              <div class="d-flex gap-3 align-items-center">
                <span class="m-0">Available:</span>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton name="addDocIsAvailable" v-model="doctorStore.addDoctorData.isAvailable"
                               input-id="addOption1" :value="true" />
                  <label for="addOption1">Yes</label>
                </div>
                <div class="d-flex justify-content-center gap-2">
                  <RadioButton name="addDocIsAvailable" v-model="doctorStore.addDoctorData.isAvailable"
                               input-id="addOption2" :value="false" />
                  <label for="addOption2">No</label>
                </div>
                <Message v-if="$form.addDocIsAvailable?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocIsAvailable.error?.message }}
                </Message>
              </div>
              <div class="w-50 ps-1">
                <Select name="addDocDepartamentId" v-model="doctorStore.addDoctorData.departamentId"
                        :options="departmentStore.departments" optionValue="id" showClear optionLabel="name"
                        appendTo="#addDoctorModal" placeholder="Select Department" class="w-100" />
                <Message v-if="$form.addDocDepartamentId?.invalid" severity="error" size="small" variant="simple">
                  {{ $form.addDocDepartamentId.error?.message }}
                </Message>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-4">
              <Button type="submit" label="Add Doctor" />
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