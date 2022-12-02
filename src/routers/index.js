import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login/index.vue";
import home from "../views/home/index.vue";

const routes = [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home/:userId",
    component: home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
