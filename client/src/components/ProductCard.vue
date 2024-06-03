<template>
  <article class="product-card">
    <div class="sku">{{ product.productSku }}</div>
    <div class="price">{{ price }}</div>
    <div class="product-name action">{{ product.name }}</div>
    <div class="product-image">
      <img v-bind:src="product.imageName" />
    </div>
    <div class="cart" v-on:click="addItemToCartClick(product.productId)">
      <font-awesome-icon icon="fa-solid fa-cart-plus icon action" title="Add item to cart"/>
    </div>
  </article>
</template>
<script>
export default {
  name: "product-card",
  props: ["product"],
  computed: {
    getFormattedPrice() {
      return Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(this.product.price);
    },
  },

  methods: {
    addItemToCartClick(productId) {
      this.$emit("cartClick", productId);
      let message = this.product.name + " added to cart";
      this.$store.commit("DISPLAY_MESSAGE", message);
    },
  },
};
</script>
<style>
.product-card {
  border: black solid 2px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 350px;

  grid-template-areas:
    "sku price"
    "product product"
    "image image"
    ". cart";
  padding: 5px;
}

.sku {
  grid-area: sku;
}

.price {
  grid-area: price;
  justify-self: right;
  padding-right: 2px;
}

.product-name {
  grid-area: product;
}

.product-image {
  grid-area: image;
  padding-left: 2px;
  flex-grow: 100%;
}

.cart {
  grid-area: cart;
  justify-self: right;
  padding-right: 5px;
}
</style>
