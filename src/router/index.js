import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/init";
const routes = [
  {
    path: "/login",
    name: "Login",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: "Login" */ "../Pages/Auth/Login"),
  },
  {
    path: "/register",
    name: "REgister",
    meta: { requiresGuest: true },
    component: () =>
      import(/* webpackChunkName: "Register" */ "../Pages/Auth/Register"),
  },
  {
    path: "/chat",
    name: "Home",
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "Home" */ "../Pages/Chat/ChatScreen"),
    children: [
      {
        path: "/",
        name: "WelcomeChat",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../Pages/Chat/Right/WelcomeChat"
          ),
      },
      {
        path: ":user_id",
        name: "MessageScreen",
        meta: { requiresAuth: true },
        component: () =>
          import(
            /* webpackChunkName: "Home" */ "../Pages/Chat/Right/MessageScreen"
          ),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../Pages/NotFound"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    if (auth.currentUser) {
      next();
    } else next({ name: "Login" });
  } else if (to.meta.requiresGuest) {
    if (auth.currentUser) {
      next({ name: "WelcomeChat" });
    } else next();
  } else next();
});

export default router;
