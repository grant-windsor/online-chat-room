<template>
<div class="container">
  <div class="loginform">
    <h1>Stay social while social distancing!</h1>
    <form class="pure-form">
      <fieldset>
        <legend class="mylegend">Register</legend>
        <input placeholder="username" v-model="username">
        <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button mybutton" @click.prevent="register">Register</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form">
      <fieldset>
        <legend class="mylegend">Login</legend>
        <input placeholder="username" v-model="usernameLogin">
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button mybutton" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },

  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.username || !this.password) {
        return;
      }
      try {
        let response = await axios.post('/api/users', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },

    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin) {
        return;
      }
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: "
        error.response.data.message;
        this.$root.$data.user = null;
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
}

.container {
  padding: 30px;
  display: flex;
  justify-content: center;
  height: 100%;
}

.loginform {
  background: #404040;
  display: inline;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 5px;
  color: white;
}

input {
  color: black;
}

.mylegend {
  color: #ccc !important;
}

.mybutton {
  font-size: 20px;
  background-color: #F35A61;
  color: white;

}

input {
  margin-right: 10px;
}

.error {
  margin-top: 20px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;

}
</style>
