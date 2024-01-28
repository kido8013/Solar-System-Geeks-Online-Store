<template>
  <main>
    <div class="header">
      <h1>
        Shopping cart
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
      <button v-on:click="clearCart()">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
        Clear Cart
      </button>
    </div>
    <shopping-cart v-bind:shoppingCart="shoppingCart" v-on:deleteCartItemEvent="handleDeleteClick($event)" />
  </main>
</template>
<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import productService from "../services/ProductService";

export default {
  name: "shopping-cart-view",
  components: { ShoppingCart, LoadingSpinner },
  data() {
    return {
      isLoading: false,
      shoppingCart: {
        tax: 0.0,
        items: [],
        itemSubtotal: 0.0,
        total: 0.0,
      },
    };
  },
  created() {
    this.getCart();
  },
  methods: {
    clearCart() {
      this.isLoading = true;
      productService
        .clearCart()
        .then(() => {
          this.shoppingCart = {
            tax: 0.0,
            items: [],
            itemSubtotal: 0.0,
            total: 0.0,
          };
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },

  getCart() {
    this.isLoading = true;
    productService
      .getCart()
      .then((response) => {
        this.shoppingCart = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  handleDeleteClick(cartItemId){
    this.isLoading = true;
    productService.deleteCartItem(cartItemId)
    .then(() => {
      this.isLoading = false;
      this.getCart();
    })
    .catch((error) => {
      console.error(error);
    });
  }  
  },
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
}
</style>