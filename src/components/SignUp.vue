<template>
    <div class="sign-up">
      <b-container>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <h3>Create a New Account</h3>
          </b-col>
        </b-row>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <input class="form-control" type="text" v-model="displayName" placeholder="Display Name">
          </b-col>
        </b-row>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <input class="form-control" type="email" v-model="email" placeholder="Email">
          </b-col>
        </b-row>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <input class="form-control" type="password" v-model="password" placeholder="Password"><br>
          </b-col>
        </b-row>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <button v-on:click="signUp">Sign Up</button>
          </b-col>
        </b-row>
        <b-row align-h="center" class="text-center">
          <b-col cols="12" sm="12" md="8">
            <router-link to="/login" tag="button" class="login-button">Already Have an Account</router-link>
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import { db } from '../main'
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      displayName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          user.updateProfile({
            displayName: this.displayName
          }).then(function () {
            // Update successful.
          }).catch(function (error) {
            throw new Error('Error updating user info' + error)
          })
          db.collection('metadata').doc(user.uid).set({
            displayName: this.displayName,
            admin: false,
            email: this.email
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
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 60%;
  cursor: pointer;
  padding: 10px;
  background-color: rgb(33,150,243);
  color: rgb(255,255,255);
}
.form-control {
  border-radius: 0px;
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
