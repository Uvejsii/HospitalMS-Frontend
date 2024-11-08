import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useDoctorStore = defineStore("doctor", () => {
    const url = 'https://localhost:7198/Doctors'
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
        departamentId: null
    })

    const getAllDoctors = async () => {
        isLoading.value = true

        try {
            const res = await fetch(`${url}/GetAllDoctors`)
            doctors.value = await res.json()
        } catch (err) {
            isError.value = true
            console.log('Doctors error: ', err)
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
            console.log('Doctor error: ', err)
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

            if (res.ok) await getAllDoctors()
        } catch (err) {
            console.log('Add Doctor error: ', err)
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

            if (res.ok) await getAllDoctors()
        } catch (err) {
            console.log('Edit Doctor error: ', err)
        }
    }

    const deleteDoctor = async (doctorId) => {
        try {
            const res = await fetch(`${url}/DeleteDoctor/${doctorId}`, {
                method: 'DELETE'
            })

            if (res.ok) await getAllDoctors()
        } catch (err) {
            console.log('Delete doctor err: ', err)
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