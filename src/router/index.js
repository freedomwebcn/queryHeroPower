import {
  createRouter,
  createWebHashHistory,
  // createWebHistory
} from "vue-router";
// import Home from '../views/Home.vue'
// import heroList from '../views/HeroList.vue'

const Home = () => import("../views/Home");
const HeroList = () => import("../views/HeroList");
const HeroPower = () => import("../views/HeroPower");

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home",
    },
  },

  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      transition: "home",
    },
  },
  {
    path: "/hero-list/:typeId/:typeName",
    name: "HeroList",
    component: HeroList,
    meta: {
      transition: "homeList",
    },
  },

  {
    path: "/heropower",
    name: "HeroPower",
    component: HeroPower,
    meta: {
      transition: "homeList",
    },
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
