import { createRouter, createWebHistory } from 'vue-router';

import { HomepageView, AuthenticationView, RankingView } from '../views';

const routes = [
  { path: '/', component: HomepageView },
  { path: '/login', component: AuthenticationView },
  { path: '/signup', component: AuthenticationView },
  { path: '/ranking', component: RankingView },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
