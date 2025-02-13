<template>
  <div class="dashboard">
    <h2>Welcome to the Dashboard!</h2>
    <p>This page is only accessible after logging in.</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "DashboardPage",
  methods: {
    logout() {
      // Remove the auth token from localStorage
      localStorage.removeItem("auth_token");

      // Redirect to the login page
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
