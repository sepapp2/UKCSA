<template>
    <div class="sign-up">
        <p>Create a new account</p>
        <input type="text" placeholder="Email"><br>
        <input type="password" placeholder="Password"><br>
        <button>Sign Up</button>
        <span>Already have an account?</span>
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
span{
    display: block;
    margin-top: 20px;
    font-size: 11px;
}
</style>