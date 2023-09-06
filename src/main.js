import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { router } from './routes';

import '@/assets/styles/index.scss';


import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue);
app.use(router);

app.component('MultiSelect', MultiSelect);
app.component('Button', Button);

app.mount('#app');