<template>
  <main>
    <div class="header">
      <h1>
        {{ product.name }}
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <button v-on:click="addToCart()">
        <font-awesome-icon
          icon="fa-solid fa-cart-plus icon action"
          title="Add item to cart"
        />
      </button>
    </div>
    <h2>Details</h2>
    <p>{{ product.productSku }} {{ formatAsDollar(product.price) }}</p>
    <p>{{ product.description }}</p>
    <img v-bind:src="product.imageName">
  </main>
</template>
<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import productService from "../services/ProductService";
export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      productId: this.$route.params.id,
      product: {},
    };
  },
  created() {
    this.isLoading = true;
    productService
      .getProductById(this.productId)
      .then((response) => {
        this.product = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    addToCart() {
      this.isLoading = true;
      productService
        .addItem(this.productId)
        .then(() => {
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    formatAsDollar(value) {
      return Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(value);
    },
  },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
}
</style>