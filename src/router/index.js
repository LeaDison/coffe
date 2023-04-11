import Vue from "vue";
import VueRouter from "vue-router";
//import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/MainView.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "menu",
        name: "Menu",
        component: () => import("../views/MenuView.vue"),
      },
      {
        path: "shopbag",
        name: "Shopbag",
        component: () => import("../views/ShopbagView.vue"),
      },
      {
        path: "my",
        name: "My",
        component: () => import("../views/MyView.vue"),
        // children: [{
        //   path: "myinfo",
        //   name: "myinfo",
        //   component: () => import('../views/MyInfoView.vue'),
        // }

        // ]
      },
    ],
  },
  {
    path: "*",
    redirect: {
      name: "Home",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/person",
    name: "Person",
    component: () => import("../views/MyInfoView.vue"),
  },
  {
    path: "/safety",
    name: "safety",
    component: () => import("../views/safetyView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
