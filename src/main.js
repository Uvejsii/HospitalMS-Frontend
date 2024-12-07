import { createApp } from 'vue'
import {createPinia} from "pinia";
import router from "./router/index.js";
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice';
import ConfirmationService from "primevue/confirmationservice";
import Ripple from 'primevue/ripple';
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
})
app.use(ToastService)
app.use(ConfirmationService)
app.directive('ripple', Ripple);
app.mount('#app')
