<template>
    <div class="card-container">
            <product-card v-for="p in products" v-bind:key="p.productId" v-bind:product="p" v-on:cartClick="handleClick($event)"></product-card>
        </div>
</template>
<script>
import ProductCard from './ProductCard.vue';
export default {
    name: 'product-cards',
    components: {ProductCard},
    props: ['products'],
    methods: {
        handleClick(productId) {
            console.log('captured click', productId);
            this.$emit('cartClick', productId);
        }
    }
}
</script>
<style>
    .card-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 25px;
    }
</style>