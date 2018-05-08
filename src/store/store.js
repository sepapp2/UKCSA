import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import { db } from '../main'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    userProfile: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getUserProfile: state => {
      return state.userProfile
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser
      db.collection('metadata').doc(Firebase.auth().currentUser.uid).get().then(function (doc) {
        if (doc.exists) {
          state.userProfile = doc.data()
        } else {
          console.log('No such document!')
        }
      }).catch(function (error) {
        console.log('Error getting document:', error)
      })
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  }
})
