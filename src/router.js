import Vue from 'vue';
import Router from 'vue-router';
import Tasks from './views/Tasks.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '*',
      redirect: '/tasks'
    },
  ],
});
