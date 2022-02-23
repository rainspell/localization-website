import './assets/index.css';

import { App as VueApp, createApp } from 'vue';
import { createWebHistory, createRouter, Router } from 'vue-router';
import { createPinia } from 'pinia';
import Home from './pages/HomePage.vue';
import App from './App.vue';

/**
 * Application entry point.
 */
async function main(): Promise<void> {
  const app: VueApp = createApp(App);
  const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  });
  
  app.use(router);
  app.use(createPinia());
  app.mount("#app");
}

main();