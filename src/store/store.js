import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getAdmin: admin => {
      admin.user = Firebase.auth().currentUser
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser
    }
  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    }
  }
})
