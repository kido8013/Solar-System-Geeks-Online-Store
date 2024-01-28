<template>
  <div id="register">
    <form v-on:submit.prevent="register" class="registration-form">
      <h1>Create Account</h1>
      <div id="fields">
        <div class="form-field">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="user.username"
          required
          autofocus
        />
        </div>
        <div class="form-field">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Name"
          v-model="user.name"
          required
        />
        </div>
        <div class="form-field">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="user.password"
          required
        />
        </div>
        <div class="form-field">
        <label for="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="user.confirmPassword"
          required
        />
        </div>

        <div class="form-field">
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          placeholder="Address"
          v-model="user.address"
        />
        </div>

        <div class="form-field">
        <label for="city">City</label>
        <input type="text" id="city" placeholder="City" v-model="user.city" />
        </div>

        <div class="form-field">
        <label for="state">State</label>
        <input
          type="text"
          id="state"
          placeholder="State"
          v-model="user.stateCode"
          maxlength="2"
          required
        />
        </div>

        <div class="form-field">
        <label for="zip">ZIP</label>
        <input
          type="number"
          id="zip"
          placeholder="ZIP"
          v-model="user.zip"
          required
          minlength="5"
          maxlength="5"
        />
        </div>
        <div></div>
        <div class="form-field">
          <button type="submit">Create Account</button>
        </div>
      </div>
      <hr />
      Have an account?
      <router-link v-bind:to="{ name: 'login' }">Sign in!</router-link>
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
        name: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        stateCode: "",
        zip: "",
        role: "user",
      },
    };
  },
  methods: {
    error(msg) {
      alert(msg);
    },
    success(msg) {
      alert(msg);
    },
    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.error("Password & Confirm Password do not match");
      } else {
        authService
          .register(this.user)
          .then((response) => {
            if (response.status == 201) {
              this.success("Thank you for registering, please sign in.");
              this.$router.push({
                path: "/login",
              });
            }
          })
          .catch((error) => {
            const response = error.response;
            if (!response) {
              this.error(error);
            } else if (response.status === 400) {
              if (response.data.errors) {
                // Show the validation errors
                let msg = "Validation error: ";
                for (let err of response.data.errors) {
                  msg += `'${err.field}':${err.defaultMessage}. `;
                }
                this.error(msg);
              } else {
                this.error(response.data.message);
              }
            } else {
              this.error(response.data.message);
            }
          });
      }
    },
  },
};
</script>

<style scoped>
#register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.registration-form {
  background-color: white;
  padding: 5px;
  padding-bottom: 25px;
  padding-left: 75px;
  padding-right: 75px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.fields {
  display:flex;
  flex-direction: column;
}

.form-field {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
}

input {
  display: flex;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  text-align: center;
  margin-top: 10px;
}

p {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}

</style>
