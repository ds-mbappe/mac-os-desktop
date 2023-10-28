// App
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Plugins
import loadFonts from './plugins/webfontloader.js';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import pinia from './plugins/pinia';

const app = createApp(App)

loadFonts()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
