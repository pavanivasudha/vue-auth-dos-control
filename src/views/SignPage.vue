<template>
  <div>
    <label for="username">Username </label>
    <input
      type="username"
      id="username"
      v-model="username"
      required
    /><br /><br />
  </div>
  <div>
    <label for="password">Password </label>
    <input type="password" id="password" v-model="password" required />
  </div>
  <button type="button" v-on:click="signup">Signup</button>
</template>

<script>
import axios from "axios";
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
        const response = await axios.post("http://localhost:8000", {
          username: this.username,
          password: this.password,
        });
        console.log(response.data);
      } catch (error) {
        console.error("Error signing up:", error);
      }
    },
  },
};
</script>
