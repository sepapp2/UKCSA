<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <b-row>
        <b-col md="4" class="my-1">
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
        <b-col md="2" class="my-1">
           <b-button variant="success" @click="filterOrders(beginningDate, endDate)">
                Filter Dates
            </b-button>
        </b-col>
        </b-row>
        <b-table striped
                 hover
                 :items="orders"
                 :fields="fields"
                 :filter="filter"
        ></b-table>
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
        }
      },
      filter: null,
      beginningDate: null,
      endDate: null,
      orders: []
    }
  },
  firestore () {
    return {
      orders: db.collection('Orders').where('orderDate', '<=', new Date()).orderBy('orderDate')
    }
  },
  methods: {
    filterOrders (beginningDate, endDate) {
    //   function filterOrders (value) {
    //     return value.orderDate >= new Date(beginningDate) && value.orderDate <= new Date(endDate)
    //   }
      if (beginningDate && endDate) {
        var ordering = []
        db.collection('Orders').where('orderDate', '>=', new Date(beginningDate)).where('orderDate', '<=', new Date(endDate)).get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            ordering.push(doc.data())
          })
        })
        this.orders = ordering
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
