import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ParkCampsites from './views/ParkCampsites.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/camping',
      name: 'camping',
      component: ParkCampsites
    },
  ]
});
