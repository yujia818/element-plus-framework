import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login/index.vue";
import home from "../views/home/index.vue";
import docs from "../views/docs/index.vue";

const routes = [
  {
    path: "/login",
    component: login,
  },
  {
    path: "/home/:userId",
    component: home,
    children: [
      {
        path: 'docs',
        component: docs
      },
      {
        path: 'docs/:docId',
        component: docs
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
