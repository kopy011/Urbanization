import { nextTick } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/Map.vue')
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import('../views/Locations.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

router.beforeEach((to, from) => {
  if(!routes.some((route) => route.path === to.path)){
    return { name: 'home' };
  }
})

export default router
