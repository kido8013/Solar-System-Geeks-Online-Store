<template>
  <div id="login">
    <form v-on:submit.prevent="login">
      <h1 class="login-header">Please Sign In</h1>
      <div class="fields">
        <div class="label-input">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        </div>
        <div class="label-input">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        </div>
        <div class="form-button"><button type="submit">Sign in</button></div>
      </div>
      <hr/>
      <p class="register-link">
      Need an account? <router-link v-bind:to="{ name: 'register' }">Register!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import authService from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService
        .login(this.user)
        .then((response) => {
          if (response.status == 200) {
            this.$store.commit("SET_AUTH_TOKEN", response.data.token);
            this.$store.commit("SET_USER", response.data.user);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          const response = error.response;
          if (!response) {
            alert(error);
          } else if (response.status === 401) {
            alert("Invalid username and password!");
          } else {
            alert(response.message);
          }
        });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.fields {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.form-label {
  margin-right: 10px;
}

.form-input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  text-align: center;
  margin-top: 5px;
}

.register-link {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
</style>
