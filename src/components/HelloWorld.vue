<template>
  <div class="hello">
    <form @submit="addProduct(name, images)">
      <input v-model="name" placeholder="Product Name">
      <input v-model="images" placeholder="Product Image URL">
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

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      name: '',
      images: ''
    }
  },
  firestore () {
    return {
      products: db.collection('Products').orderBy('createdAt')
    }
  },
  methods: {
    addProduct (name, images) {
      const createdAt = new Date()
      db.collection('Products').add({ name, images, createdAt })
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
