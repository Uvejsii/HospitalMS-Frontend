import {defineStore} from "pinia";
import {useToast} from "primevue/usetoast";
import {reactive, ref} from "vue";
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
    const registerDoctorData = reactive({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    })
    const registerAdminData = reactive({
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
        roles: null,
        id: null
    })
    const loggedInDoctor = reactive({
        firstName: null,
        lastName: null,
        imageFilePath: null,
        departament: {
            name: null,
            location: null
        },
        email: null,
        phoneNumber: null,
        consultationFee: null
    })
    const notificationToAllDoctors = ref('')
    const notificationToAllAdmins = ref('')
    const notificationToAllUsers = ref('')
    const notificationToUserByEmail = ref('')
    const selectedUser = ref(null)
    const allUsers = ref([])
    const usersByName = ref([])

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

    const registerDoctor = async () => {
        const newDoctor = {
            firstName: registerDoctorData.firstName,
            lastName: registerDoctorData.lastName,
            email: registerDoctorData.email,
            password: registerDoctorData.password,
            confirmPassword: registerDoctorData.confirmPassword
        }

        try {
            const res = await fetch(`${url}/RegisterDoctor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDoctor)
            })

            if (res.ok) {
                toast.add({ severity: 'success', summary: 'Successfully Registered Doctor', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error While Registering Doctor', life: 3000 });
            }

        } catch (err) {
            console.log(err.message)
            toast.add({ severity: 'error', summary: 'Error While Registering Doctor', life: 3000 });
        }
    }

    const registerAdmin = async () => {
        const newAdmin = {
            firstName: registerAdminData.firstName,
            lastName: registerAdminData.lastName,
            email: registerAdminData.email,
            password: registerAdminData.password,
            confirmPassword: registerAdminData.confirmPassword
        }

        try {
            const res = await fetch(`${url}/RegisterAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newAdmin)
            })

            if (res.ok) {
                toast.add({ severity: 'success', summary: 'Successfully Registered Admin', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error While Registering Admin', life: 3000 });
            }

        } catch (err) {
            console.log(err.message)
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

                loginData.email = null;
                loginData.password = null;

                if (data.roles.includes("Admin")) {
                    await router.push("/admin/doctorsDashboard")
                    toast.add({ severity: 'success', summary: 'Successfully Logged in as Admin', life: 3000 });
                } else if (data.roles.includes("Doctor")){
                    await router.push("/doctorProfile")
                    toast.add({ severity: 'success', summary: 'Successfully Logged in as Doctor', life: 3000 });
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
                    loggedInUser.id = await data.userId
                    localStorage.setItem('hmsUser', JSON.stringify(data))
                }
        } catch (err) {
            console.log(err)
        }
    }

    const getLoggedInDoctor = async () => {
        try {
            const res = await fetch(`${url}/GetLoggedInDoctor`, {
                method: 'GET',
                credentials: 'include'
            })
            const data = await res.json()

            if (res.ok) {
                localStorage.setItem('doctorData', JSON.stringify(data))

                loggedInDoctor.firstName = await data.firstName
                loggedInDoctor.lastName = await data.lastName
                loggedInDoctor.imageFilePath = await data.imageFilePath
                loggedInDoctor.departament.name = await data.departament.name
                loggedInDoctor.departament.location = await data.departament.location
                loggedInDoctor.email = await data.email
                loggedInDoctor.phoneNumber = await data.phoneNumber
                loggedInDoctor.consultationFee = await data.consultationFee
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const isDoctorOn = () => {
        const doctor = localStorage.getItem('doctorData')
        if (doctor) {
            const parsedDoctor = JSON.parse(doctor)

            loggedInDoctor.firstName = parsedDoctor.firstName
            loggedInDoctor.lastName = parsedDoctor.lastName
            loggedInDoctor.imageFilePath = parsedDoctor.imageFilePath
            loggedInDoctor.departament.name = parsedDoctor.departament.name
            loggedInDoctor.departament.location = parsedDoctor.departament.location
            loggedInDoctor.email = parsedDoctor.email
            loggedInDoctor.phoneNumber = parsedDoctor.phoneNumber
            loggedInDoctor.consultationFee = parsedDoctor.consultationFee
        }

        return doctor ? doctor : null
    }

    const logOut = async () => {
        try {
            const res = await fetch(`${url}/Logout`, {
                method: 'POST',
                credentials: 'include',
            })
            if (res.ok) {
                await router.push('/login')
                localStorage.removeItem('hmsUser')
                localStorage.removeItem('hmsUserIsAdmin')
                localStorage.removeItem('doctorData')
                loggedInUser.firstName = null
                loggedInUser.lastName = null
                loggedInUser.roles = null
                loggedInUser.id = null
            } else {
                console.log('error logging out')
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const resetPassword = async (data) => {
        try {
            const res = await fetch(`${url}/ResetPasswordCustom`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: data.email}),
            })
            if (res.ok) {
                toast.add({ severity: 'success', summary: 'Successfully Reset Password', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Error While Resetting Password', life: 3000 });
            }
        } catch (err) {
            toast.add({ severity: 'error', summary: 'Error While Resetting Password', life: 3000 });
        }
    }

    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('hmsUser')
        if (user) {
            const parsedUser = JSON.parse(user)
            loggedInUser.firstName = parsedUser.firstName
            loggedInUser.lastName = parsedUser.lastName
            loggedInUser.roles = parsedUser.roles
            loggedInUser.id = parsedUser.userId
        }

        return user ? user : null
    }

    getUserFromLocalStorage()

    const isAdmin = () => !!localStorage.getItem('hmsUserIsAdmin')

    const sendNotificationToAllDoctors = async (data) => {
        const res = await fetch(`${url}/SendNotificationToAllDoctors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: data })
        })

        if (res.ok) {
            notificationToAllDoctors.value = ''
        }
    }

    const sendNotificationToAllAdmins = async (data) => {
        const res = await fetch(`${url}/SendNotificationToAllAdmins`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: data })
        })

        if (res.ok) {
            notificationToAllAdmins.value = ''
        }
    }

    const sendNotificationToAllUsers = async (data) => {
        const res = await fetch(`${url}/SendNotificationToAll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: data })
        })

        if (res.ok) {
            notificationToAllUsers.value = ''
        }
    }

    const sendNotificationToUserByEmail = async (email, message) => {
        const res = await fetch(`${url}/SendNotificationByEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, message }),
        })

        if (res.ok) {
            notificationToUserByEmail.value = ''
            selectedUser.value = null
        }
    }

    const getAllUsers = async () => {
        const res = await fetch(`${url}/GetAllUsers`, {
            method: 'GET',
        })
        allUsers.value = await res.json()
    }

    const getUsersByName = async (name) => {
        if (!name.query.trim().length) {
            usersByName.value = [];
            return;
        }

        const res = await fetch(`${url}/GetUsersByName/${name.query}`, {
            method: 'GET',
        })

        const data = await res.json()

        usersByName.value = await data?.map(user => ({
            ...user,
            fullName: `${user.firstName} ${user.lastName}`
        }));
    }

    return {
        registerPatientData,
        registerPatient,
        loginData,
        login,
        loggedInUser,
        pingAuth,
        logOut,
        resetPassword,
        getUserFromLocalStorage,
        isAdmin,
        getLoggedInDoctor,
        isDoctorOn,
        loggedInDoctor,
        sendNotificationToAllDoctors,
        notificationToAllDoctors,
        sendNotificationToAllAdmins,
        notificationToAllAdmins,
        sendNotificationToAllUsers,
        notificationToAllUsers,
        sendNotificationToUserByEmail,
        notificationToUserByEmail,
        selectedUser,
        getAllUsers,
        allUsers,
        getUsersByName,
        usersByName
    }
})