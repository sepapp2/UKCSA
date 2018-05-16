<template>
  <div class="products">
    <b-btn variant="success" class="top-button" v-if="userProfile.admin" v-b-modal.modal1>Add New Product</b-btn>
    <!-- User Cards -->
    <b-card-group deck v-if="!userProfile.admin">
      <b-col cols="12" sm="12" md="6" lg="4" v-for="(product, idx) in products" :key="idx" class="product-card">
        <b-card :title="product.name"
                :img-src= "product.images"
                img-alt="Img"
                img-top
                img-fluid
        >
            <p class="card-text">
                <div class="text-muted">
                  Quantity Available: {{ product.quantity }}
                </div>
                <div>
                {{ product.description }}
                </div>
            <div slot="footer">
                <small class="text-muted">Last updated {{ product.modifiedDtm | moment("from", "now", true) }} ago</small>
                <b-row>
                  <b-col>
                    <b-button @click="addToCart(product)" variant="outline-primary">Add to Cart</b-button>
                  </b-col>
                </b-row>
            </div>
        </b-card>
      </b-col>
    </b-card-group>

    <!-- Admin Cards -->
    <b-card-group deck v-if="userProfile.admin">
      <b-col cols="12" sm="12" md="6" lg="4" v-for="(product, idx) in products" :key="idx" class="product-card">
        <b-card
                :img-src= "product.images"
                img-alt="Img"
                img-top
                img-fluid
        >
                <div class="text-muted text-left">
                  <b-form-group
                      id="productNameGroup"
                      label="Update the Name"
                      label-for="productName"
                  >
                    <b-form-input id="productName" v-model="product.name" v-on:change="changeProduct(product, idx)"></b-form-input>
                  </b-form-group>
                  <b-form-group
                      id="productQtyGroup"
                      type="number"
                      label="Update the quantity"
                      label-for="productQty"
                  >
                    <b-form-input type="number" id="productQty" v-model="product.quantity" v-on:change="changeProduct(product, idx)"></b-form-input>
                  </b-form-group>
                  <b-form-group
                      id="productDescriptionGroup"
                      label="Update the Product Description"
                      label-for="productDescription"
                  >
                    <textarea id="productDescription" class="form-control" v-model="product.description" v-on:change="changeProduct(product, idx)"></textarea>
                  </b-form-group>
                  <b-form-group
                      id="productUrlGroup"
                      type="url"
                      label="Update the Url"
                      label-for="productUrl"
                  >
                    <b-form-input type="url" id="productUrl" v-model="product.images" v-on:change="changeProduct(product, idx)"></b-form-input>
                  </b-form-group>
                </div>
            <div slot="footer">
                <small class="text-muted">Last updated {{ product.modifiedDtm | moment("from", "now", true) }} ago</small>
                <b-row v-if="userProfile.admin">
                  <b-col>
                    <b-button @click="deleteProduct(product.id)" variant="outline-primary">Remove Product</b-button>
                  </b-col>
                </b-row>
                <b-row v-if="!userProfile.admin">
                  <b-col>
                    <b-button @click="addToCart(product)" variant="outline-primary">Add to Cart</b-button>
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
    <b-modal  id="shoppingCartModal"
              size="lg"
              ref="modal"
              title="Shopping Cart"
              @ok="onCheckout"
              @cancel="onReset"
              ok-title="Submit">
        <b-list-group>
          <h2 v-if="cart.length == 0">Cart Empty</h2>
        <b-list-group-item v-for="(value, key, index) in cart" :key="index" class="font-double d-flex justify-content-between align-items-center">
          {{ value.name }}
          <b-badge variant="primary" pill>{{ value.quantity }}</b-badge>
          <div class="icon-set align-middle">
          <div v-on:click="addQuantity(key)">
            <icon scale="2" name="plus-circle" class="align-middle"></icon>
          </div>
          <div v-on:click="subtractQuantity(key, value)">
            <icon scale="2" name="minus-circle" class="align-middle"></icon>
          </div>
          <div @click="removeItem(key, value)">
            <icon scale="2" name="trash" class="align-middle"></icon>
          </div>
          </div>
        </b-list-group-item>
        </b-list-group>
        <div slot="modal-footer">
          <b-button @click="onCancel()" type="reset" variant="secondary">Close Cart</b-button>
          <b-button @click="onCheckout(cart)" type="submit" variant="primary">Place Order</b-button>
       </div>
    </b-modal>
  </div>
</template>

<script>
import { db } from '../main'
import Firebase from 'firebase'

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
      cart: [],
      show: true
    }
  },
  firestore () {
    return {
      products: db.collection('Products').orderBy('createdAt')
    }
  },
  methods: {
    changeProduct (product, idx) {
      // Create a reference to the Product doc.
      var sfDocRef = db.collection('Products').doc(product.id)
      return db.runTransaction(function (transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then(function (sfDoc) {
          if (!sfDoc.exists) {
            throw new Error('Document does not exist!')
          }
          var updateDate = new Date()
          transaction.update(sfDocRef, {
            quantity: product.quantity,
            modifiedDtm: updateDate,
            name: product.name,
            description: product.description,
            images: product.images
          })
        })
      }).then(function () {
        console.log('Transaction successfully committed!')
      }).catch(function (error) {
        console.log('Transaction failed: ', error)
      })
    },
    deleteProduct (id) {
      db.collection('Products').doc(id).delete()
    },
    addQuantity (key) {
      let quantityAvailable = this.products.filter(val => {
        return val.id === this.cart[key].id
      })
      if (quantityAvailable[0].quantity > 0) {
        quantityAvailable[0].quantity--
        this.cart[key].quantity++
      } else {
        alert('You have reached the available quantity of this item.')
      }
    },
    subtractQuantity (key, value) {
      if (this.cart[key].quantity > 1) {
        this.cart[key].quantity--
        let quantityAvailable = this.products.filter(val => {
          return val.id === this.cart[key].id
        })
        quantityAvailable[0].quantity++
      } else {
        this.removeItem(key, value)
      }
    },
    removeItem (key, value) {
      this.cart.splice(key, 1)
      let quantityRemove = this.products.filter(val => {
        return val.id === value.id
      })
      quantityRemove[0].quantity = quantityRemove[0].quantity + value.quantity
    },
    addToCart (product) {
      let inCart = this.cart.filter(val => {
        return val.id === product.id
      })
      if (inCart.length > 0) {
        alert('You have already added this item to your cart.  You may adjust the quantity in your cart.')
      } else if (product.quantity < 1) {
        alert('This item is no longer available for purchase')
      } else {
        product.quantity--
        this.cart.push({
          id: product.id,
          name: product.name,
          quantity: 1
        })
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.form.createdAt = new Date()
      this.form.modifiedDtm = new Date()
      db.collection('Products').add(this.form)
      this.form = {}
      this.$refs.modal.hide()
    },
    onCheckout (cart) {
      cart.forEach(element => {
        var sfDocRef = db.collection('Products').doc(element.id)

        return db.runTransaction(function (transaction) {
        // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function (sfDoc) {
            if (!sfDoc.exists) {
              throw new Error('Document does not exist!')
            }
            if (element.quantity > sfDoc.data().quantity) {
              alert('There is no longer enough avaible quantity of ' + element.name)
              throw new Error('There is no longer enough avaible quantity of ' + element.name)
            }
            var updateDate = new Date()
            transaction.update(sfDocRef, {
              quantity: sfDoc.data().quantity - element.quantity,
              modifiedDtm: updateDate
            })
            db.collection('Orders').add({
              quantity: element.quantity,
              orderDate: updateDate,
              name: element.name,
              productID: element.id,
              userName: Firebase.auth().currentUser.displayName,
              userID: Firebase.auth().currentUser.uid,
              isFilled: false
            })
          })
        }).then(function () {
          console.log('Transaction successfully committed!')
        }).catch(function (error) {
          console.log('Transaction failed: ', error)
        })
      })
      // var obj = this.cart.reduce(function (acc, cur, i) {
      //   acc[i] = cur
      //   return acc
      // }, {})
      // obj.userID = Firebase.auth().currentUser.uid
      // obj.userName = Firebase.auth().currentUser.displayName
      // obj.orderDate = new Date()
      // db.collection('Orders').add(obj)
      this.cart = []
      this.$refs.modal.hide()
    },
    onCancel () {
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
.icon-set {
  display: flex;
}
.fa-icon {
  margin: 5px;
}
.font-double {
  font-size: 2rem;
}
</style>
