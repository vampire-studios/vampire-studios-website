import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {fluentVue} from './localization'

createApp(App).use(store).use(router).use(fluentVue).mount('#app')
