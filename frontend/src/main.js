import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App)

app.use(router)
app.use(createPinia().use(piniaPluginPersistedstate));
app.mount('#app')
