<template>
    <div class="sign-up">
        <h3>Create a new account</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button>Sign Up</button><br>
        <router-link to="/login" tag="button" class="login-button">Already Have an Account</router-link>
    </div>
</template>

<script>
export default {
  name: 'signUp',
  data: function () {
    return {}
  },
  methods: {}
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