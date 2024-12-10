<script setup>
import {useAuthStore} from "../../store/auth/useAuthStore.js";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Form from "@primevue/forms/form";
import Message from "primevue/message";
import {ref} from "vue";
import {zodResolver} from "@primevue/forms/resolvers/zod";
import {z} from 'zod'

const authStore = useAuthStore()

const initialValues = ref({
  loginEmail: '',
  loginPassword: ''
})

const resolver = ref(
    zodResolver(
        z.object({
          loginEmail: z.string().min(1, { message: 'Email is required' })
              .email({ message: 'Invalid email address' }),
          loginPassword: z.string().min(1, { message: 'Password is required' })
        })
    )
)

const onFormSubmit = async ({ valid }) => {
  if (valid) {
    await authStore.login()
  }
}

</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="row">
      <div class="col-12 border rounded shadow-sm p-5">
        <h3 class="text-center mb-4">Login</h3>
        <Form id="registerPatientForm" v-slot="$form" :resolver="resolver"
              :initialValues="initialValues" @submit="onFormSubmit">
          <div class="d-flex flex-column gap-3">
            <FloatLabel variant="on">
              <InputText name="loginEmail" id="loginEmail" type="text"
                         class="form-control w-100" autocomplete="off"
                         v-model.trim="authStore.loginData.email" />
              <label :class="{'pb-3': $form.loginEmail?.invalid}" for="loginEmail">Email</label>
              <Message v-if="$form.loginEmail?.invalid" severity="error" size="small" variant="simple">
                {{ $form.loginEmail.error?.message }}
              </Message>
            </FloatLabel>
            <FloatLabel variant="on">
              <Password name="loginPassword" id="loginPassword" class="w-100" :inputStyle="{ width: '100%' }"
                        v-model.trim="authStore.loginData.password" :feedback="false" toggleMask />
              <label :class="{'pb-3': $form.loginPassword?.invalid}" for="loginPassword">Password</label>
              <Message v-if="$form.loginPassword?.invalid"
                       severity="error" size="small" variant="simple">
                {{ $form.loginPassword.error?.message }}
              </Message>
            </FloatLabel>
          </div>
          <div class="d-flex flex-column gap-4">
            <Button type="submit" label="Login" class="w-100 mt-4" />
            <p class="m-0 text-center">Don't have an account? click
              <RouterLink to="/register">here</RouterLink>
              to create one.
            </p>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>