import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import vuetify from '@/lib/vuetify'
import { VueQueryPlugin } from '@tanstack/vue-query';
import queryClient from './lib/queryClient';
import './styles/app.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueQueryPlugin, { queryClient: queryClient });

app.mount('#app')
