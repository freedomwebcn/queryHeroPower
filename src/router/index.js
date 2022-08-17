import {
  createRouter,
  createWebHistory
} from 'vue-router'
// import Home from '../views/Home.vue'
// import heroList from '../views/HeroList.vue'

const Home = () => import('../views/Home.vue')
const heroList = () => import('../views/HeroList.vue')

const routes = [{
    path: '/',
    redirect: {
      name: 'Home'
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/hero-list/:typeId/:typeName',
    name: 'heroList',
    component: heroList,

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router