import { Router, createRouter as createVueRouter, createWebHistory} from 'vue-router';
import { PortalLayout } from '@/layouts';

/**
 * TBD
 */
export function createRouter(): Router {
  const router: Router = createVueRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        component: PortalLayout,
        children: [
          {
            path: '',
            component: () => import('./pages/HomePage.vue')
          }
        ]
      }
    ]
  });

  return router;
}