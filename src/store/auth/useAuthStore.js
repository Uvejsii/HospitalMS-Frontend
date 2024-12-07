import {defineStore} from "pinia";
import {useToast} from "primevue/usetoast";
import {reactive} from "vue";

export const useAuthStore = defineStore('auth', () => {
    const url = 'https://localhost:7198/Auth'
    const toast = useToast()
    const registerPatientData = reactive({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    })

    const registerPatient = async () => {
        const newPatient = {
            firstName: registerPatientData.firstName,
            lastName: registerPatientData.lastName,
            email: registerPatientData.email,
            password: registerPatientData.password,
            confirmPassword: registerPatientData.confirmPassword
        }

        try {
            const res = await fetch(`${url}/RegisterPatient`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPatient)
            })

            if (res.ok) {
                toast.add({ severity: 'success', summary: 'Successfully Registered', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error While Registering', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Registering', life: 3000 });
        }
    }

    return {
        registerPatientData,
        registerPatient
    }
})