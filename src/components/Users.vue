<template>
  <div class="products">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" offset-md="3">
          <b-table striped
                   hover
                   :items="users"
                   :fields="fields"
          >
          <template slot="admin" slot-scope="item">
            <b-form-select v-model="item.item.admin" :options="options" class="mb-3" @change="changeRole(item.item)"/>
          </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase'

export default {
  name: 'Users',
  data () {
    return {
      options: [
        { value: true, text: 'Admin' },
        { value: false, text: 'User' }
      ],
      fields: {
        displayName: {
          label: 'User Name',
          sortable: true
        },
        email: {
          label: 'Email Address',
          sortable: true
        },
        admin: {
          label: 'Role',
          sortable: true
        }
      },
      users: []
    }
  },
  firestore () {
    return {
      users: db.collection('metadata')
    }
  },
  methods: {
    changeRole (user) {
      if (user.id === firebase.auth().currentUser.uid) {
        alert('You cannot alter your own role')
      } else {
        var userDocRef = db.collection('metadata').doc(user.id)
        return db.runTransaction(function (transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(userDocRef).then(function (userDoc) {
            if (!userDoc.exists) {
              throw new Error('Document does not exist!')
            }
            transaction.update(userDocRef, {
              admin: user.admin
            })
          })
        }).then(function () {
          console.log('Transaction successfully committed!')
        }).catch(function (error) {
          console.log('Transaction failed: ', error)
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
