<template>
  <header id="product-header">
    <h1>
      Products
      <loading-spinner id="spinner" v-bind:spin="isLoading" />
    </h1>
    <div id="search-tiles">
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: cardView }"
        v-on:click="cardView = true"
        icon="fa-solid fa-grip"
        title="View tiles"
      />
      <font-awesome-icon
        v-bind:class="{ 'view-icon': true, active: !cardView }"
        v-on:click="cardView = false"
        icon="fa-solid fa-table"
        title="View table"
      />
      <div id="searchbar">
        <input type="text" v-model="searchTerm" v-on:keyup="getProductByName" placeholder="Search.." />
        
        <button type="submit" @click="getProductByName">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button> 
      </div>
    </div>
  </header>
  <product-cards
    v-if="cardView"
    v-bind:products="productArray"
    v-on:cartClick="handleCartClick($event)"
  ></product-cards>
  <products-table
    v-else
    v-bind:products="productArray"
    v-on:cartClick="handleCartClick($event)"
  ></products-table>
  <br>
  
</template>

<script>
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductCards from "../components/ProductCards.vue";
import ProductsTable from "../components/ProductsTable.vue";
import productService from "../services/ProductService.js";

export default {
  components: {
    LoadingSpinner,
    ProductCards,
    ProductsTable,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      productArray: [],
      searchTerm: "",
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
  },

  methods: {
    handleCartClick(productId) {
      productService
        .addItem(productId)
        .then((response) => {
          console.log(response.data);
          console.log("Item Added to Cart!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getProductByName() {
    productService.searchProduct(this.searchTerm)
    .then((response)=> {
      if (response.data != []) {
      this.productArray = response.data;
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
  },

  created() {
    this.isLoading = true;
    productService
      .getProducts()
      .then((response) => {
        this.productArray = response.data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
#spinner {
  color: green;
}

#search-tiles {
  display: flex;
  margin-top: 5px;
}

.view-icon {
  font-size: 1.2rem;
  margin-right: 7px;
  padding: 3px;
  color: #444;
  border-radius: 3px;
}

.view-icon.active {
  background-color: lightgreen;
}

.view-icon:not(.active) {
  font-size: 1.2rem;
  margin-right: 7px;
  cursor: pointer;
}

.view-icon:not(.active):hover {
  color: blue;
  background-color: rgba(255, 255, 255, 0.7);
}

#product-header {
  display: flex;
  justify-content: space-between;
}

</style>