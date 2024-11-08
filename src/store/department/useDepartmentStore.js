import {defineStore} from "pinia";
import {reactive, ref} from "vue";

export const useDepartmentStore = defineStore('department', () => {
    const url = 'https://localhost:7198/Department'
    const departments = ref([])

    const addDepartmentData = reactive({
        name: '',
        location: ''
    })

    const getAllDepartments = async () => {
        try {
            const res = await fetch(`${url}/GetAllDepartments`)
            departments.value = await res.json()
        } catch (err) {
          console.log('Departments error: ', err)
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

            if (res.ok) await getAllDepartments()
        } catch (err) {
            console.log('Add Department error: ', err)
        }
    }

    return {
        getAllDepartments,
        addDepartment,
        departments,
        addDepartmentData
    }
})