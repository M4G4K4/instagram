import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('../views/About.vue')
  },
  {
    path: '/lista',
    name: 'lista',
    component: () => import('../views/Lista.vue')
  },
  {
    path: '/lista2',
    name: 'lista2',
    component: () => import('../views/Lista2.vue')
  },
  {
    path: '/lista3',
    name: 'lista3',
    component: () => import('../views/Lista3.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Auth/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/random',
    name: 'Random',
    component: () => import('../views/random.vue')
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../components/Posts')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../components/Perfil')
  },
  {
    path: '/userimage',
    name: 'Change Image',
    component: () => import('../components/UploadImage')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
