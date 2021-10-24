import { createRouter, createWebHistory } from 'vue-router';

import { AuthenticationView, PageNotFoundView, HomepageView, LaunchCountdownView, RankingView } from '../views';

const launchAppDay = new Date('2021-12-01').getTime();
const today = Date.now();
const launched = launchAppDay - today < 0;

const routes = [
  { path: '/', component: launched ? HomepageView : LaunchCountdownView },
  { path: '/login', component: AuthenticationView },
  { path: '/signup', component: AuthenticationView },
  { path: '/ranking', component: launched ? RankingView : LaunchCountdownView },
  { path: '/:pathMatch(.*)*', component: PageNotFoundView },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
