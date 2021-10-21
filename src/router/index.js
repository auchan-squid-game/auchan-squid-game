import { createRouter, createWebHistory } from 'vue-router';

import { HomepageView, AuthenticationView, LaunchCountdownView } from '../views';

const launchAppDay = new Date('2021-12-25').getTime();
const today = Date.now();
const launched = launchAppDay - today < 0;
console.log(launchAppDay - today);

const routes = [
  { path: '/', component: launched ? HomepageView : LaunchCountdownView },
  { path: '/login', component: AuthenticationView },
  { path: '/signup', component: AuthenticationView },
];

const router = createRouter({ history: createWebHistory(process.env.BASE_URL), routes });

export default router;
