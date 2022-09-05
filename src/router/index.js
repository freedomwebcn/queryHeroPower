import {
  createRouter,
  createWebHashHistory,
  // createWebHistory
} from 'vue-router'
// import Home from '../views/Home.vue'
// import heroList from '../views/HeroList.vue'

const Home = () => import('../views/Home')
const heroList = () => import('../views/HeroList')
const search = () => import('../views/search')


const routes = [{
    path: '/',
    redirect: {
      name: 'Home'
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'home'
    },
  },
  {
    path: '/hero-list/:typeId/:typeName',
    name: 'heroList',
    component: heroList,
    meta: {
      transition: 'homeList'
    },

  },

  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      transition: 'homeList'
    },


  }

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes
})


export default router