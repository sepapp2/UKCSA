<template>
  <div id="app">
      <b-navbar toggleable="md" type="dark" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="#">UK CSA</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

          <b-navbar-nav>
            <b-nav-item v-if="user" href="#">Products</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right text="User" id="right-menu-dropdown" v-if="user">
              <!-- Using button-content slot -->

              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item v-on:click="logout" href="#">Sign out</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item v-if="!userProfile.admin && user">
              <b-button variant="success" class="my-2 my-sm-0" v-b-modal.shoppingCartModal><icon name="shopping-cart"></icon> Cart</b-button>
            </b-nav-item>
          </b-navbar-nav>

        </b-collapse>
      </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'App',
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    userProfile () {
      return this.$store.getters.getUserProfile
    }
  },
  methods: {
    logout: function () {
      Firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
    setUser: function () {
      this.$store.dispatch('setUser')
    }
  },
  created () {
    // when the app is created run the set user method
    // this uses Vuex to check if a user is signed in
    // check out mutations in the store.js file
    this.setUser()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#right-menu-dropdown {
  margin-top: 10px;
}
</style>
