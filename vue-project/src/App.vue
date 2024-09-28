<template>
  <div id="app">
    <nav>
      <button @click="showRegister = true">Register</button>
      <button @click="showRegister = false">Login</button>
      <button v-if="token" @click="logout">Logout</button>
    </nav>
    
    <div v-if="showRegister">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="registerUsername" placeholder="Username" required />
        <input v-model="registerPassword" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>{{ registerMessage }}</p>
    </div>

    <div v-else>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="loginUsername" placeholder="Username" required />
        <input v-model="loginPassword" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>{{ loginMessage }}</p>
    </div>

    <div v-if="token">
      <h3>Protected Content</h3>
      <p>This content is accessible only to logged-in users.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showRegister: true,
      registerUsername: '',
      registerPassword: '',
      loginUsername: '',
      loginPassword: '',
      registerMessage: '',
      loginMessage: '',
      token: localStorage.getItem('token') || null
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: this.registerUsername,
          password: this.registerPassword
        });
        this.registerMessage = response.data.message;
        this.registerUsername = '';
        this.registerPassword = '';
      } catch (error) {
        this.registerMessage = error.response?.data.message || 'Registration failed!';
      }
    },
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/login', {
          username: this.loginUsername,
          password: this.loginPassword
        });
        this.loginMessage = response.data.message;
        this.token = response.data.token;
        localStorage.setItem('token', this.token);
        this.loginUsername = '';
        this.loginPassword = '';
      } catch (error) {
        this.loginMessage = error.response?.data.message || 'Invalid username or password!';
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem('token');
    }
  },
  watch: {
    token(newValue) {
      if (newValue) {
        this.$forceUpdate();
      }
    }
  },
};
</script>

<style>
nav {
  margin-bottom: 20px;
}
form {
  margin-bottom: 20px;
}
</style>
