<template>
    <div class="sign-up">
        <h3>Create a new account</h3>
        <input type="text" v-model="email" placeholder="Email"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <button v-on:click="signUp">Sign Up</button><br>
        <router-link to="/login" tag="button" class="login-button">Already Have an Account</router-link>
    </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          db.collection('metadata').doc(user.uid).set({
            admin: false
          })
          firebase.database().ref('metadata/' + user.uid + '/refreshTime')
          alert('Your account has been created.')
          this.$router.replace('products')
        },
        (err) => {
          alert('Error occurred.' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
.sign-up {
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
  background-color: rgb(33,150,243);
  color: rgb(255,255,255);
}
.login-button {
  background-color: rgb(0,150,136);
  color: rgb(255,255,255);
}
span{
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>
