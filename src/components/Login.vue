<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button class="login-button" v-on:click="login">Login</button><br>
        <router-link to="/sign-up" tag="button" class="new-account-button">Create an Account</router-link>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        function (user) {
          alert('Success!')
        },
        function (err) {
          alert('Problem logging in. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
  padding: 10px;
}
.login-button {
  background-color: rgb(33,150,243);
  color: rgb(255,255,255);
}
.new-account-button {
  background-color: rgb(0,150,136);
  color: rgb(255,255,255);
}
</style>
