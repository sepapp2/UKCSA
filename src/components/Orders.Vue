<template>
    <div class="orders">
        <b-table striped hover :items="orders" :fields="fields"></b-table>
    <b-row v-for="(order, idx) in orders" :key="idx">
     <b-col cols="12" sm="12" md="6" lg="4">
         {{order.userName}}
         <h1 v-for="(value, idz) in order" :key="idz">{{value}}</h1>
    </b-col>
    </b-row>
</div>
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
      orders: []
    }
  },
  firestore () {
    return {
      orders: db.collection('Orders').where('orderDate', '<=', new Date())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
