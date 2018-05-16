import Vue from 'vue'
import Router from 'vue-router'
import Products from '@/components/Products'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Orders from '@/components/Orders'
import Users from '@/components/Users'
import firebase from 'firebase'
import { db } from '../main'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  let isAdmin = false
  if (currentUser != null) {
    isAdmin = db.collection('metadata').doc(firebase.auth().currentUser.uid).get().then(function (doc) {
      if (doc.exists) {
        return doc.data()
      } else {
        return false
      }
    }).catch(function (error) {
      console.log('Error getting document:', error)
    })
  } else {
    isAdmin = false
  }
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next()
  else if (requiresAuth && requiresAdmin) {
    isAdmin.then(function (result) {
      if (result.admin) {
        next()
      } else {
        next('products')
      }
    })
  } else next()
})

export default router
