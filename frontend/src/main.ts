import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/global.css'
import '@mdi/font/css/materialdesignicons.min.css'
import vuetify from './plugins/vuetify'
import pinia from './stores'

const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(router)

app.mount('#app')
