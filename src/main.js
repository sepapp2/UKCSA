// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import 'firebase/firestore'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { store } from './store/store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(require('vue-moment'))
Vue.use(VueFire)
Vue.component('icon', Icon)
const config = {
  apiKey: 'AIzaSyCPcaTE8IiaxCy8GLYv8LEJN8rdabAq1L0',
  authDomain: 'ukcsa-b381d.firebaseapp.com',
  databaseURL: 'https://ukcsa-b381d.firebaseio.com',
  projectId: 'ukcsa-b381d',
  storageBucket: 'ukcsa-b381d.appspot.com',
  messagingSenderId: '579632448796'
}
Firebase.initializeApp(config)
export const storage = Firebase.storage()
export const db = Firebase.firestore()
Firebase.auth().onAuthStateChanged(function (user) {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    components: { App, Icon },
    template: '<App/>',
    store: store,
    router
  })
})
