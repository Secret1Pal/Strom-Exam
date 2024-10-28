import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import lazyLoad from './directives/lazyLoad'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import * as FaIcons from "oh-vue-icons/icons/fa";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}


const Fa = Object.values({ ...FaIcons });
addIcons(...Fa);

const app = createApp(App)
app.directive('lazy', lazyLoad);
app.component("v-icon", OhVueIcon);
app.use(router)

app.mount('#app')
