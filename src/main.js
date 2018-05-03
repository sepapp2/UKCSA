// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { store } from './store/store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

let app
Vue.use(VueFire)
let config = {
  apiKey: 'AIzaSyCPcaTE8IiaxCy8GLYv8LEJN8rdabAq1L0',
  authDomain: 'ukcsa-b381d.firebaseapp.com',
  databaseURL: 'https://ukcsa-b381d.firebaseio.com',
  projectId: 'ukcsa-b381d',
  storageBucket: 'ukcsa-b381d.appspot.com',
  messagingSenderId: '579632448796'
}
firebase.initializeApp(config)
export const db = firebase.firestore()
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      components: { App },
      template: '<App/>',
      store: store,
      router
    })
  }
})
