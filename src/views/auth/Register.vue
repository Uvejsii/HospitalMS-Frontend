<script setup>
import {useAuthStore} from "../../store/auth/useAuthStore.js";
import Form from "@primevue/forms/form"
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Password from "primevue/password"
import Message from "primevue/message";
import Button from "primevue/button"
import {zodResolver} from "@primevue/forms/resolvers/zod";
import {z} from 'zod';
import {ref} from "vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

const initialValues = ref({
  registerPatientFirstName: '',
  registerPatientLastName: '',
  registerPatientEmail: '',
  registerPatientPassword: '',
  registerPatientConfirmPassword: ''
})

const resolver = ref(
  zodResolver(
      z.object({
        registerPatientFirstName: z.string().min(1, { message: 'First name is required' }),
        registerPatientLastName: z.string().min(1, { message: 'Last name is required' }),
        registerPatientEmail: z.string().min(1, { message: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        registerPatientPassword: z.string()
            .min(8, { message: 'Password should be at least 8 characters long' })
            .refine((value) => /[a-z]/.test(value), {
              message: 'Must have a lowercase letter',
            })
            .refine((value) => /[A-Z]/.test(value), {
              message: 'Must have an uppercase letter',
            })
            .refine((value) => /\d/.test(value), {
              message: 'Must have a number',
            })
            .refine((value) => /[^a-zA-Z0-9]/.test(value), {
              message: 'Must have a non-alphanumeric character',
            }),
        registerPatientConfirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
      }).refine((data) => data.registerPatientPassword === data.registerPatientConfirmPassword, {
        message: 'Passwords must match',
        path: ['registerPatientConfirmPassword'],
      })
  )
)

const onFormSubmit = ({ valid }) => {
  if (valid) {
    authStore.registerPatient()
    router.push('/')
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="row">
      <div class="col-12 border rounded shadow-sm p-5">
        <h3 class="text-center mb-4">Register</h3>
        <Form id="registerPatientForm" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="d-flex justify-content-between">
            <FloatLabel variant="on">
              <InputText name="registerPatientFirstName" id="registerPFN" type="text"
                         class="form-control" autocomplete="off"
                         v-model.trim="authStore.registerPatientData.firstName" />
              <label :class="{'pb-3': $form.registerPatientFirstName?.invalid}" for="registerPFN">First name</label>
              <Message v-if="$form.registerPatientFirstName?.invalid" severity="error" size="small" variant="simple">
                {{ $form.registerPatientFirstName.error?.message }}
              </Message>
            </FloatLabel>
            <FloatLabel variant="on">
              <InputText name="registerPatientLastName" id="registerPLN" type="text"
                         class="form-control" autocomplete="off"
                         v-model.trim="authStore.registerPatientData.lastName" />
              <label :class="{'pb-3': $form.registerPatientLastName?.invalid}" for="registerPLN">Last name</label>
              <Message v-if="$form.registerPatientLastName?.invalid" severity="error" size="small" variant="simple">
                {{ $form.registerPatientLastName.error?.message }}
              </Message>
            </FloatLabel>
          </div>
          <div class="my-4">
            <FloatLabel variant="on">
              <InputText name="registerPatientEmail" id="registerPE" type="text"
                         class="form-control" autocomplete="off"
                         v-model.trim="authStore.registerPatientData.email" />
              <label :class="{'pb-3': $form.registerPatientEmail?.invalid}" for="registerPE">Email</label>
              <Message v-if="$form.registerPatientEmail?.invalid" severity="error" size="small" variant="simple">
                {{ $form.registerPatientEmail.error?.message }}
              </Message>
            </FloatLabel>
          </div>
          <div class="d-flex gap-4 justify-content-between">
            <FloatLabel variant="on">
              <Password name="registerPatientPassword" id="registerPPw"
                        v-model.trim="authStore.registerPatientData.password"
                        promptLabel="Choose a password" weakLabel="Too simple"
                        mediumLabel="Average complexity" strongLabel="Strong password" />
              <label :class="{'pb-3': $form.registerPatientPassword?.invalid}" for="registerPPw">Password</label>
              <Message v-if="$form.registerPatientPassword?.invalid" severity="error" size="small" variant="simple">
                {{ $form.registerPatientPassword.error?.message }}
              </Message>
            </FloatLabel>
            <FloatLabel variant="on">
              <Password name="registerPatientConfirmPassword" id="registerPCPw"
                        v-model.trim="authStore.registerPatientData.confirmPassword"
                        promptLabel="Choose a password" weakLabel="Too simple"
                        mediumLabel="Average complexity" strongLabel="Strong password" />
              <label :class="{'pb-3': $form.registerPatientConfirmPassword?.invalid}" for="registerPPw">
                Confirm password
              </label>
              <Message v-if="$form.registerPatientConfirmPassword?.invalid"
                       severity="error" size="small" variant="simple">
                {{ $form.registerPatientConfirmPassword.error?.message }}
              </Message>
            </FloatLabel>
          </div>
          <Button type="submit" label="Register" class="w-100 mt-4" />
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>