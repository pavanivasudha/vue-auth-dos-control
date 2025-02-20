<template>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" v-model="username" required /><br /><br />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" v-model="password" required />
  </div>
  <button type="button" v-on:click="signup">Signup</button>

  <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
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
    async signup() {
      try {
        const response = await fetch("/.netlify/functions/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.username, // Use user input
            password: this.password,
          }),
        });

        const data = await response.json(); // Properly parse response
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Signupfailed");
        }
      } catch (error) {
        console.error("Error signing up:", error);
        this.errorMessage = error.message;
      }
    },
  },
};
</script>
