import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/styles/variables.css'
import './assets/styles/global.css'
import './assets/styles/layout.css'
import './assets/styles/navbar.css'
import './assets/styles/footer.css'

createApp(App).use(router).mount('#app')