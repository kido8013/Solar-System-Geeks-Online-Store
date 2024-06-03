<template>
  <div id="cart-app">
    <header id="headerImage"><img src="https://via.placeholder.com/700x200.jpg" alt="Company Logo"></header>
    <nav-bar id="nav-bar">
    </nav-bar>
    <main>
      <router-view />
    </main>
    <footer>
      <p id="footer-text">&copy; Your Company Name</p>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar }
}
</script>


<style scoped>

#headerImage {
  width: 100%;
  height: 100%;
}

header {
  text-align: center;
  background-color: white;
}

#nav-bar {
  display: flex;
  background-color: white;
  border: solid 2px black;
  padding: 5px;
}

footer {
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: left;
}

#footer-text {
  margin-left: 5px;
}

</style>