import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";


export const useDoctorStore = defineStore("doctor", () => {
    const url = 'http://localhost:5233/Doctors'
    const toast = useToast()
    const doctors = ref([])
    const doctor = ref({})
    let isLoading = ref(false)
    let isError = ref(false)
    let showAddDocForm = ref(false)
    let showEditDocForm = ref(false)
    const selectedDoctorId = ref(null)

    const addDoctorData = reactive({
        firstName: '',
        lastName: '',
        image: null,
        imageFileName: '',
        yearsOfExperience: 1,
        email: '',
        phoneNumber: '',
        consultationFee: 0,
        isAvailable: true,
        departamentId: null
    })

    const editDoctorData = reactive({
        firstName: '',
        lastName: '',
        image: '',
        imageFileName: '',
        imageFilePath: null,
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
        const formData = new FormData();

        formData.append("firstName", addDoctorData.firstName);
        formData.append("lastName", addDoctorData.lastName);
        formData.append("yearsOfExperience", addDoctorData.yearsOfExperience);
        formData.append("email", addDoctorData.email);
        formData.append("phoneNumber", addDoctorData.phoneNumber);
        formData.append("consultationFee", addDoctorData.consultationFee);
        formData.append("isAvailable", addDoctorData.isAvailable);
        formData.append("departamentId", addDoctorData.departamentId);
        formData.append("image", addDoctorData.image)
        formData.append("imageFileName", addDoctorData.imageFileName)

        try {
            const res = await fetch(`${url}/CreateDoctor`, {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                await getAllDoctors()
                toast.add({ severity: 'success', summary: 'Doctor Added Successfully', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error Adding Doctor', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error Adding Doctor', life: 3000 });
        }
    }

    const startEditDoctor = (doctor) => {
        editDoctorData.firstName = doctor.firstName
        editDoctorData.lastName = doctor.lastName
        editDoctorData.image = doctor.image
        editDoctorData.imageFileName = doctor.imageFileName
        editDoctorData.imageFilePath = doctor.imageFilePath
        editDoctorData.yearsOfExperience = doctor.yearsOfExperience
        editDoctorData.email = doctor.email
        editDoctorData.phoneNumber = doctor.phoneNumber
        editDoctorData.consultationFee = doctor.consultationFee
        editDoctorData.isAvailable = doctor.isAvailable
        editDoctorData.departamentId = doctor.departament.id
        selectedDoctorId.value = doctor.id
    }

    const editDoctor = async () => {
        const editFormData = new FormData();

        editFormData.append("firstName", editDoctorData.firstName);
        editFormData.append("lastName", editDoctorData.lastName);
        editFormData.append("yearsOfExperience", editDoctorData.yearsOfExperience);
        editFormData.append("email", editDoctorData.email);
        editFormData.append("phoneNumber", editDoctorData.phoneNumber);
        editFormData.append("consultationFee", editDoctorData.consultationFee);
        editFormData.append("isAvailable", editDoctorData.isAvailable);
        editFormData.append("departamentId", editDoctorData.departamentId);
        editFormData.append("image", editDoctorData.image)
        editFormData.append("imageFileName", editDoctorData.imageFileName)

        try {
            const res = await fetch(`${url}/EditDoctor/${selectedDoctorId.value}`, {
                method: 'PUT',
                body: editFormData
            })

            if (res.ok) {
                await getAllDoctors()

                toast.add({ severity: 'success', summary: 'Doctor Updated Successfully', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error Updating Doctor', life: 3000 });
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
            } else {
                toast.add({ severity: 'error', summary: 'Error Deleting Doctor', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error Deleting Doctor', life: 3000 });
        }
    }

    const getImageUrlWithCache = (imageFilePath) => {
        if (!imageFilePath) {
            return 'https://via.placeholder.com/150';
        }
        const timestamp = new Date().getTime();
        return `${imageFilePath}?t=${timestamp}`;
    };

    const fileSizeAbove10Mb = () => {
        toast.add({ severity: 'error', summary: 'File size exceeds 10MB', life: 4000 });
    }

    const invalidFileType = () => {
        toast.add({ severity: 'error', summary: 'Invalid file type. Only .jpg, .jpeg, and .png are allowed.', life: 5000 });
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
        editDoctorData,
        showAddDocForm,
        showEditDocForm,
        getImageUrlWithCache,
        fileSizeAbove10Mb,
        invalidFileType
    }
})