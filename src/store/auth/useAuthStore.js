import {defineStore} from "pinia";
import {useToast} from "primevue/usetoast";
import {reactive} from "vue";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const url = 'http://localhost:5233/Auth'
    const toast = useToast()
    const router = useRouter()
    const registerPatientData = reactive({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    })
    const loginData = reactive({
        email: null,
        password: null,
        rememberMe: true
    })
    const loggedInUser = reactive({
        firstName: null,
        lastName: null,
        roles: null
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

    const login = async () => {
        const userLoginData = {
            email: loginData.email,
            password: loginData.password,
            rememberMe: loginData.rememberMe
        }

        try {
            const res = await fetch(`${url}/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLoginData),
                credentials: 'include',
            })
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('hmsUserIsAdmin', JSON.stringify(!!data.roles.includes('Admin')))

                if (data.roles.includes("Admin")) {
                    await router.push("/admin/doctorsDashboard")
                    toast.add({ severity: 'success', summary: 'Successfully Logged in as Admin', life: 3000 });
                } else {
                    await router.push("/")
                    toast.add({ severity: 'success', summary: 'Successfully Logged in', life: 3000 });
                }

                await pingAuth()
            } else {
                toast.add({ severity: 'error', summary: "Email or Password doesn't match", life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: "Email or Password doesn't match", life: 3000 });
        }
    }

    const pingAuth = async () => {
        try {
            const res = await fetch(`${url}/PingAuth`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await res.json()
                if (res.ok) {
                    loggedInUser.firstName = await data.firstName
                    loggedInUser.lastName = await data.lastName
                    loggedInUser.roles = await data.roles
                    localStorage.setItem('hmsUser', JSON.stringify(data))
                }
        } catch (err) {
            console.log(err)
        }
    }

    const logOut = async () => {
        try {
            const res = await fetch(`${url}/Logout`, {
                method: 'POST',
                credentials: 'include'
            })
            if (res.ok) {
                await router.push('/login')
                localStorage.removeItem('hmsUser')
                localStorage.removeItem('hmsUserIsAdmin')
                loggedInUser.firstName = null
                loggedInUser.lastName = null
                loggedInUser.roles = null
            } else {
                console.log('error logging out')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('hmsUser')
        if (user) {
            const parsedUser = JSON.parse(user)
            loggedInUser.firstName = parsedUser.firstName
            loggedInUser.lastName = parsedUser.lastName
            loggedInUser.roles = parsedUser.roles
        }

        return user ? user : null
    }

    getUserFromLocalStorage()

    const isAdmin = () => !!localStorage.getItem('hmsUserIsAdmin')

    return {
        registerPatientData,
        registerPatient,
        loginData,
        login,
        loggedInUser,
        pingAuth,
        logOut,
        getUserFromLocalStorage,
        isAdmin
    }
})