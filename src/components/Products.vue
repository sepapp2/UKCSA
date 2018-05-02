<template>
  <div class="hello">
    <form @submit="addProduct(name, images, quantity)">
      <input v-model="name" placeholder="Product Name">
      <input v-model="images" placeholder="Product Image URL">
      <input type="number" v-model="quantity" placeholder="Please enter the quantity">
      <button type="submit">Add New Product</button>
    </form>
    <div>
      <article v-for="(product, idx) in products" :key="idx">
        <img :src="product.images">
        <h1>{{ product.name }}</h1>
        <button @click="deleteProduct(product.id)">
          Delete
        </button>
      </article>
    </div>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase'

export default {
  name: 'Producs',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      name: '',
      images: '',
      quantity: ''
    }
  },
  firestore () {
    return {
      products: db.collection('Products').orderBy('createdAt')
    }
  },
  methods: {
    addProduct (name, images, quantity) {
      const createdAt = new Date()
      db.collection('Products').add({ name, images, quantity, createdAt })
    },
    deleteProduct (id) {
      db.collection('Products').doc(id).delete()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
