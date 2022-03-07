import './assets/index.css';

import { App as VueApp, createApp } from 'vue';
import { Router } from 'vue-router';
import { createPinia } from 'pinia';
import { createRouter } from './Router';
import App from './App.vue';

/**
 * Application entry point.
 */
async function main(): Promise<void> {
  const app: VueApp = createApp(App);
  const router: Router = createRouter();
  
  app.use(router);
  app.use(createPinia());
  app.mount("#app");
}

main();