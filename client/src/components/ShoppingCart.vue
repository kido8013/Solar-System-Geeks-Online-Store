<template>
  <section>
    <table>
      <thead>
        <th>Qty</th>
        <th>Product</th>
        <th>Price</th>
        <th>Amount</th>
        <th></th>
      </thead>
      <tbody
        v-for="cartItem in shoppingCart.items"
        v-bind:key="cartItem.cartItemId"
      >
        <td>
          {{ cartItem.quantity }}
        </td>
        <td>
          {{ cartItem.product.name }}
        </td>
        <td>
          {{ cartItem.product.price }}
        </td>
        <td>
          {{ getSubtotal(cartItem.quantity, cartItem.product.price) }}
        </td>
        <td>
          <button v-on:click="emitDeleteEvent(cartItem.cartItemId)">X</button>
        </td>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="3">Subtotal</th>
          <th>{{ formatAsDollar(shoppingCart.itemSubtotal) }}</th>
        </tr>
        <tr>
          <th colspan="3">Taxes</th>
          <th>{{ formatAsDollar(shoppingCart.tax) }}</th>
        </tr>
        <tr>
          <th colspan="3">Total</th>
          <th>{{ formatAsDollar(shoppingCart.total) }}</th>
        </tr>
      </tfoot>
    </table>
  </section>
</template>
<script>
export default {
  name: "shopping-cart",
  props: ["shoppingCart"],
  methods: {
    getSubtotal(quantity, price) {
      return this.formatAsDollar(quantity * price);
    },
    formatAsDollar(value) {
      return Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
      }).format(value);
    },
    emitDeleteEvent(cartItemId) {
        this.$emit('deleteCartItemEvent', cartItemId)
    }
  },
};
</script>
<style>
</style>