<template>
<table>
    <thead>
        <th>SKU</th>
        <th>Product</th>
        <th>Price</th>
        <th></th>
    </thead>
    <tbody>
        <tr v-for="product in products" v-bind:key="product.productId">
            <td>{{product.productSku}}</td>
            <td>{{product.name}}</td>
            <td>{{product.price}}</td>
            <td class="cart" v-on:click="addItemToCartClick(product)"><font-awesome-icon icon="fa-solid fa-cart-plus icon action" title="Add item to cart"/>
            </td>
            </tr>
    </tbody>
    </table>
    <div>
        
    </div>
</template>
<script>
export default {
    name: 'products-table',
    props: ['products'],
    methods: {
    addItemToCartClick(product) {
      this.$emit("cartClick", product.productId);
      let message = product.name + " added to cart";
      this.$store.commit("DISPLAY_MESSAGE", message);
    },
    }
}
</script>
<style>
    
</style>