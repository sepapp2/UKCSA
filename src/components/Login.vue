<template>
    <div class="login">
        <h3>Sign In</h3>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button>Login</button>
        <p>No Account</p>
    </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {}
  },
  methods: {}
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
  background-color: rgb(33,150,243);
  color: rgb(255,255,255);
}
</style>
