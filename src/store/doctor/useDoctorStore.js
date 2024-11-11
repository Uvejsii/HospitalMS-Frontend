import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";


export const useDoctorStore = defineStore("doctor", () => {
    const url = 'https://localhost:7198/Doctors'
    const toast = useToast()
    const doctors = ref([])
    const doctor = ref({})
    let isLoading = ref(false)
    let isError = ref(false)
    const selectedDoctorId = ref(null)

    const addDoctorData = reactive({
        firstName: '',
        lastName: '',
        imageIrl: '',
        yearsOfExperience: 0,
        email: '',
        phoneNumber: '',
        consultationFee: 0,
        isAvailable: true,
        departamentId: null
    })

    const editDoctorData = reactive({
        firstName: '',
        lastName: '',
        imageIrl: '',
        yearsOfExperience: 0,
        email: '',
        phoneNumber: '',
        consultationFee: 0,
        isAvailable: null,
        departamentId: null
    })

    const getAllDoctors = async () => {
        isLoading.value = true

        try {
            const res = await fetch(`${url}/GetAllDoctors`)
            doctors.value = await res.json()
        } catch (err) {
            isError.value = true
            toast.add({ severity: 'error', summary: 'Error While Getting Doctors Data', life: 3000 });
        } finally {
            isLoading.value = false
        }
    }

    const getDoctorById = async (docId) => {
        isLoading.value = true

        try {
            const res = await fetch(`${url}/GetDoctorById/${docId}`)
            doctor.value = await res.json()
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Getting Doctor', life: 3000 });
        } finally {
            isLoading.value = false
        }
    }

    const addDoctor = async () => {
        const newDoctor = {
            firstName: addDoctorData.firstName,
            lastName: addDoctorData.lastName,
            imageIrl: addDoctorData.imageIrl,
            yearsOfExperience: addDoctorData.yearsOfExperience,
            email: addDoctorData.email,
            phoneNumber: addDoctorData.phoneNumber,
            consultationFee: addDoctorData.consultationFee,
            isAvailable: addDoctorData.isAvailable,
            departamentId: addDoctorData.departamentId
        }

        try {
            const res = await fetch(`${url}/CreateDoctor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDoctor)
            })

            if (res.ok) {
                await getAllDoctors()
                toast.add({ severity: 'success', summary: 'Doctor Added Successfully', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error Adding Doctor', life: 3000 });
        }
    }

    const startEditDoctor = (doctor) => {
        editDoctorData.firstName = doctor.firstName
        editDoctorData.lastName = doctor.lastName
        editDoctorData.imageIrl = doctor.imageIrl
        editDoctorData.yearsOfExperience = doctor.yearsOfExperience
        editDoctorData.email = doctor.email
        editDoctorData.phoneNumber = doctor.phoneNumber
        editDoctorData.consultationFee = doctor.consultationFee
        editDoctorData.isAvailable = doctor.isAvailable
        editDoctorData.departamentId = doctor.departament.id
        selectedDoctorId.value = doctor.id
    }

    const editDoctor = async () => {
        const updatedDoctor = {
            firstName: editDoctorData.firstName,
            lastName: editDoctorData.lastName,
            imageIrl: editDoctorData.imageIrl,
            yearsOfExperience: editDoctorData.yearsOfExperience,
            email: editDoctorData.email,
            phoneNumber: editDoctorData.phoneNumber,
            consultationFee: editDoctorData.consultationFee,
            isAvailable: editDoctorData.isAvailable,
            departamentId: editDoctorData.departamentId
        }

        try {
            const res = await fetch(`${url}/EditDoctor/${selectedDoctorId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDoctor)
            })

            if (res.ok) {
                await getAllDoctors()
                toast.add({ severity: 'success', summary: 'Doctor Updated Successfully', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error Updating Doctor', life: 3000 });
        }
    }

    const deleteDoctor = async (doctorId) => {
        try {
            const res = await fetch(`${url}/DeleteDoctor/${doctorId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                await getAllDoctors()
                toast.add({ severity: 'success', summary: 'Doctor Deleted Successfully', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error Deleting Doctor', life: 3000 });
        }
    }

    return {
        getAllDoctors,
        getDoctorById,
        addDoctor,
        startEditDoctor,
        editDoctor,
        deleteDoctor,
        isLoading,
        isError,
        doctors,
        doctor,
        addDoctorData,
        editDoctorData
    }
})