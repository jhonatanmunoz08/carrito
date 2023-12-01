import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// PrimeVue
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/saga-blue/theme.css"
import 'primeicons/primeicons.css'

import router from './router';
import store from './store/vuex';

store.dispatch('init')

createApp(App)
  .use(router)
  .use(store)
  .use(PrimeVue, { ripple: true })
  .mount('#app')
