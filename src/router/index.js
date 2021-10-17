import { createRouter, createWebHistory } from 'vue-router';

import { HomepageView, AuthenticationView } from '../views';

const routes = [
  { path: '/', component: HomepageView },
  { path: '/login', component: AuthenticationView },
  { path: '/signup', component: AuthenticationView },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
