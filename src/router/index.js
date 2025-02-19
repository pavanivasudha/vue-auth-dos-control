import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/LoginPage.vue";
import Dashboard from "../views/DashboardPage.vue";
import SignPage from "../views/SignPage.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }, // Meta property to mark this route as protected
  },
  {
    path: "/SignPage",
    name: "SignPage",
    component: SignPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to protect routes requiring authentication
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  const isAuthenticated = localStorage.getItem("auth_token"); // Check for authentication token

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // If the user is not authenticated, redirect to login
    if (!isAuthenticated) {
      next({ name: "Login" }); // Redirect to login page if not authenticated
    } else {
      next(); // Allow access to the dashboard if authenticated
    }
  } else {
    next(); // Allow access to routes that do not require authentication (like login page)
  }
});

export default router;
