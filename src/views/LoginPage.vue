<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    <button type="button" v-on:click="signup">Signup</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Static credentials
      const validUsername = "admin";
      const validPassword = "admin";

      // Check if entered credentials match the static values
      if (this.username === validUsername && this.password === validPassword) {
        // Store the authentication flag in localStorage
        localStorage.setItem("auth_token", "authenticated");

        // Redirect to the dashboard
        this.$router.push({ name: "Dashboard" });
      } else {
        this.errorMessage = "Invalid username or password";
      }
    },
    signup() {
      // Redirect to the signup page (SignPage)
      this.$router.push({ name: "SignPage" });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 14px;
}
</style>
