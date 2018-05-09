<template>
  <div class="products">
    <b-btn variant="success" class="top-button" v-if="userProfile.admin" v-b-modal.modal1>Add New Product</b-btn>
    <!-- <div class="product-add" v-if="userProfile.admin">
      <form @submit="addProduct(name, images, description, quantity)">
        <input v-model="name" placeholder="Product Name">
        <input v-model="images" placeholder="Product Image URL">
        <input v-model="description" placeholder="Product Description">
        <input type="number" v-model="quantity" placeholder="Please enter the quantity">
        <button type="submit">Add New Product</button>
      </form>
    </div> -->
    <b-card-group deck>
      <b-col cols="4" v-for="(product, idx) in products" :key="idx" class="product-card">
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
    <!-- Modal Component -->
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="modal-form">
    <b-modal  id="modal1"
              size="lg"
              ref="modal"
              title="Add New Product"
              v-if="userProfile.admin"
              @ok="onSubmit"
              @cancel="onReset"
              ok-title="Submit">
      <b-form-group id="productNameGroup"
                    label="Product Name:"
                    label-for="productName"
                    >
        <b-form-input id="productName"
                      type="text"
                      v-model="form.name"
                      required
                      placeholder="Enter Product Name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="productImageGroup"
                    label="URL to image:"
                    label-for="productImage">
        <b-form-input id="productImage"
                      type="url"
                      v-model="form.images"
                      required
                      placeholder="Enter URL for image to display">
        </b-form-input>
      </b-form-group>
        <b-form-group id="productQuantityGroup"
                    label="Enter Available Quantity:"
                    label-for="productQuantity">
        <b-form-input id="productQuantity"
                      type="number"
                      v-model="form.quantity"
                      required
                      placeholder="Enter Quantity of Product Available">
        </b-form-input>
      </b-form-group>
        <b-form-group id="productDescriptionGroup"
                    label="Product Description:"
                    label-for="productDescription">
        <b-form-textarea id="productDescription"
                      :rows="3"
                      v-model="form.description"
                      required
                      placeholder="Enter a brief product description">
        </b-form-textarea>
      </b-form-group>
      <div slot="modal-footer">
          <b-button type="reset" variant="secondary">Cancel</b-button>
          <b-button type="cancel" variant="primary">Submit</b-button>
       </div>
    </b-modal>
     </b-form>
  </div>
</template>

<script>
import { db } from '../main'

export default {
  name: 'Products',
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
      form: {
        name: '',
        images: '',
        description: '',
        quantity: ''
      },
      products: [],
      show: true
    }
  },
  firestore () {
    return {
      products: db.collection('Products').orderBy('createdAt')
    }
  },
  methods: {
    // addProduct (form) {
    //   const createdAt = new Date()
    //   db.collection('Products').add({ form })
    // },
    deleteProduct (id) {
      db.collection('Products').doc(id).delete()
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.form.createdAt = new Date()
      this.form.modifiedDtm = new Date()
      db.collection('Products').add(this.form)
      this.form = {}
      this.$refs.modal.hide()
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form = {}
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
      this.$refs.modal.hide()
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
.products {
  margin-top: 15px;
}
.modal-form {
  text-align: initial;
}
.top-button, .product-card {
  margin-bottom: 15px;
}
</style>
