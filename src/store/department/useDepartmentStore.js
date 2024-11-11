import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {useToast} from "primevue/usetoast";

export const useDepartmentStore = defineStore('department', () => {
    const url = 'https://localhost:7198/Department'
    const toast = useToast()
    const departments = ref([])
    let isLoading = ref(false)
    const selectedDepartmentId = ref(null)
    const editDepartmentData = reactive({
        name: '',
        location: ''
    })

    const addDepartmentData = reactive({
        name: '',
        location: ''
    })

    const getAllDepartments = async () => {
        isLoading.value = true

        try {
            const res = await fetch(`${url}/GetAllDepartments`)
            departments.value = await res.json()
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Getting Departments Data', life: 3000 });
        } finally {
            isLoading.value = false
        }
    }

    const addDepartment = async () => {
        const newDepartment = {
            name: addDepartmentData.name,
            location: addDepartmentData.location
        }

        try {
            const res = await fetch(`${url}/CreateDepartment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDepartment)
            })

            if (res.ok) {
                await getAllDepartments()
                toast.add({ severity: 'success', summary: 'Successfully Added Department', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Adding Department', life: 3000 });
        }
    }

    const startEditDepartment = (department) => {
        editDepartmentData.name = department.name
        editDepartmentData.location = department.location
        selectedDepartmentId.value = department.id
    }

    const editDepartment = async () => {
        const updatedDepartment = {
            name: editDepartmentData.name,
            location: editDepartmentData.location
        }

        try {
            const res = await fetch(`${url}/EditDepartment/${selectedDepartmentId.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDepartment)
            })

            if (res.ok) {
                await getAllDepartments()
                toast.add({ severity: 'success', summary: 'Successfully Edited Department', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Editing Department', life: 3000 });
        }
    }

    const deleteDepartment = async (departmentId) => {
        try {
            const res = await fetch(`${url}/DeleteDepartment/${departmentId}`, {
                method: 'DELETE'
            })

            if (res.ok) {
                await getAllDepartments()
                toast.add({ severity: 'success', summary: 'Successfully Deleted Department', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Deleting Department', life: 3000 });
        }
    }

    return {
        getAllDepartments,
        addDepartment,
        startEditDepartment,
        selectedDepartmentId,
        editDepartment,
        deleteDepartment,
        editDepartmentData,
        departments,
        isLoading,
        addDepartmentData
    }
})