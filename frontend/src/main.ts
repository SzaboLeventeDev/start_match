import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/global.css';
import '@mdi/font/css/materialdesignicons.min.css';
import vuetify from './plugins/vuetify';
import pinia from './stores';
import BaseForm from './components/ui/BaseForm.vue';
import BaseModal from './components/ui/BaseModal.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseCard from './components/ui/BaseCard.vue';

const app = createApp(App);

app.component('base-form', BaseForm);
app.component('base-modal', BaseModal);
app.component('base-button', BaseButton);
app.component('base-card', BaseCard);

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount('#app');
