<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        <b-col md="3" class="my-1">
            <b-input-group>
                <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-input-group-append>
                <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                </b-input-group-append>
            </b-input-group>
        </b-col>
        <b-col md="3" class="my-1">
            <b-form-group horizontal label="Start Date" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="beginningDate" type="date" placeholder="Order Start Date" />
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="3" class="my-1">
            <b-form-group horizontal label="End Date" class="mb-0">
                <b-input-group>
                    <b-form-input v-model="endDate" type="date" placeholder="Order Start Date" />
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col md="1" class="my-1 centered">
            <b-form-checkbox id="filledStatus"
                            v-model="filledStatus"
                            @input="filledFilter(beginningDate, endDate)">
            Show Filled
            </b-form-checkbox>
        </b-col>
        <b-col md="2" class="my-1">
           <b-button variant="primary" @click="filterOrders(beginningDate, endDate)">
                Filter Dates
            </b-button>
        </b-col>
        </b-row>
        <b-table striped
                 hover
                 :items="orders"
                 :fields="fields"
                 :filter="filter"
        >
        <template slot="actions" slot-scope="item">
          <b-btn variant='success' size="sm" v-if="!item.item.isFilled" @click="markItemFilled(item.item, true)">Mark Order Filled</b-btn>
          <b-btn variant='danger' size="sm" v-if="item.item.isFilled" @click="markItemFilled(item.item, false)">Mark Order Not Filled</b-btn>
        </template>
        </b-table>
    </b-container>
</template>

<script>
import { db } from '../main'

export default {
  name: 'Orders',
  data () {
    return {
      fields: {
        userName: {
          label: 'Customer',
          sortable: true
        },
        name: {
          label: 'Product Name',
          sortable: true
        },
        quantity: {
          label: 'Quantity',
          sortable: false
        },
        actions: {
          label: 'Order Status'
        }
      },
      filter: null,
      beginningDate: null,
      endDate: null,
      orders: [],
      filledStatus: false
    }
  },
  firestore () {
    return {
      orders: db.collection('Orders').where('isFilled', '==', false).where('orderDate', '<=', new Date()).orderBy('orderDate')
    }
  },
  methods: {
    filterOrders (beginningDate, endDate) {
      if (beginningDate && endDate) {
        var ordering = []
        db.collection('Orders').where('orderDate', '>=', new Date(beginningDate)).where('orderDate', '<=', new Date(endDate)).where('isFilled', '==', this.filledStatus).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            ordering.push(doc.data())
          })
        })
        this.orders = ordering
      }
    },
    filledFilter (beginningDate, endDate) {
      var ordering = []
      if (beginningDate && endDate) {
        db.collection('Orders').where('isFilled', '==', this.filledStatus).where('orderDate', '>=', new Date(beginningDate)).where('orderDate', '<=', new Date(endDate)).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            ordering.push(doc.data())
          })
        })
      } else {
        db.collection('Orders').where('isFilled', '==', this.filledStatus).where('orderDate', '<=', new Date()).orderBy('orderDate').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            ordering.push(doc.data())
          })
        })
      }
      this.orders = ordering
    },
    markItemFilled (item, fillStatus) {
      db.collection('Orders').where('productID', '==', item.productID).where('userID', '==', item.userID).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          var orderDocRef = db.collection('Orders').doc(doc.id)
          return db.runTransaction(function (transaction) {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(orderDocRef).then(function (orderDoc) {
              if (!orderDoc.exists) {
                throw new Error('Document does not exist!')
              }
              transaction.update(orderDocRef, {
                isFilled: fillStatus
              })
            })
          }).then(function () {
            console.log('Transaction successfully committed!')
          }).catch(function (error) {
            console.log('Transaction failed: ', error)
          })
        })
      })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
      var index = this.orders.findIndex(x => x.productID === item.productID)
      this.orders.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.centered {
  margin: auto!important
}
</style>
