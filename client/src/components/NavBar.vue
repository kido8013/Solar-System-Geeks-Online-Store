<template>
    <nav>
        <router-link id="left-home" v-bind:to="{ name: 'home' }">Home</router-link>
        <router-link id="left-cart" v-bind:to="{ name: 'shopping-cart' }">Cart</router-link>

        <div class="message">{{ this.$store.state.message }}</div>

        <router-link id="right-nav" v-bind:to="{ name: 'logout' }" v-if="$store.state.token">
          Logout
        </router-link>
        <router-link id="right-nav" v-bind:to="{ name: 'login' }" v-else>Login</router-link>
    </nav>
</template>
<script>
export default {
    data() {
      return {
        message: "",
      }
    },
    methods: {
      showMessage(message) {
        this.message = message;
        setTimeout(() => {
          this.message = "";
        }, 3000)
      }
    }
}
</script>
<style>
    #left-home {
  margin-left: 5px;
}

#left-cart {
  margin-left: 30px;
  flex: 1 1 0;
}

#right-nav {
    display: flex;
    justify-content: flex-end;
    flex: 1 1 0;
    margin-right: 5px;
}

.message {
    text-align: center;
    flex: 1 1 0;
    color: black;
    margin-right: 95px;
}
</style>