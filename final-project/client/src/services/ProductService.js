import axios from 'axios';

export default {

  getProducts() {
    return axios.get('/products')
  },

  getCart() {
    return axios.get('/cart')
  },

  addItem(productId) {
    const body = {
      productId: productId,
      quantity: 1,
    }
    return axios.post('/cart/items', body);
  },

  clearCart(){
    return axios.delete('/cart')
  },

  deleteCartItem(cartItemId) {
    return axios.delete(`/cart/items/${cartItemId}`)
  },

  getProductById(productId) {
    return axios.get(`/products/${productId}`);
  },

  searchProduct(searchTerm) {
    return axios.get(`products?name=${searchTerm}`);
  }
}
