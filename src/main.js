import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { router } from './routes';

import './style.scss';


import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';

import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';


const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('MultiSelect', MultiSelect);
app.component('Button', Button);

app.mount('#app');