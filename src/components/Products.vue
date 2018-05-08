<template>
  <div class="hello">
    <div class="product-add" v-if="userProfile.admin">
      <form @submit="addProduct(name, images, description, quantity)">
        <input v-model="name" placeholder="Product Name">
        <input v-model="images" placeholder="Product Image URL">
        <input v-model="description" placeholder="Product Description">
        <input type="number" v-model="quantity" placeholder="Please enter the quantity">
        <button type="submit">Add New Product</button>
      </form>
    </div>
    <b-card-group deck>
      <b-col cols="4" v-for="(product, idx) in products" :key="idx">
        <b-card :title="product.name"
                :sub-title="'Quantity Available: ' + product.quantity"
                :img-src= "product.images"
                img-alt="Img"
                img-top
                img-fluid
        >
            <p class="card-text">
                {{ product.description }}
            </p>
            <div slot="footer">
                <small class="text-muted">Last updated 3 mins ago</small>
                <b-row v-if="userProfile.admin">
                  <b-col>
                    <b-button @click="deleteProduct(product.id)" variant="outline-primary">Remove Product</b-button>
                  </b-col>
                </b-row>
            </div>
        </b-card>
      </b-col>
    </b-card-group>
  </div>
</template>

<script>
import { db } from '../main'

export default {
  name: 'Producs',
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    userProfile () {
      return this.$store.getters.getUserProfile
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      products: [],
      name: '',
      images: '',
      description: '',
      quantity: ''
    }
  },
  firestore () {
    return {
      products: db.collection('Products').orderBy('createdAt')
    }
  },
  methods: {
    addProduct (name, images, description, quantity) {
      const createdAt = new Date()
      db.collection('Products').add({ name, images, description, quantity, createdAt })
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
.product-add {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
