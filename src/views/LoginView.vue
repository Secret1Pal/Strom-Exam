<script setup>
import { inject, ref } from "vue"
import { useRouter } from "vue-router"
import useRequestData from "@/hook/useRequestData"; 

const {makeRequest, data, isLoading, error} = useRequestData()

const {userState, login, logout} = inject("user")

import Loader from "../assets/Loader.vue"

const router = useRouter()

const loginFailed = ref("")

const handleSubmit = async (event) => {
  const LoginPost = new FormData(event.target);
  for (const [key, value] of LoginPost) {
    console.log(`${key}: ${value}`)
  }
  await makeRequest("http://127.0.0.1:5333/login/login", "POST", LoginPost);

  if (error.value) {
    loginFailed.value = error.value;
  } else if (data.value) {
    let isAdmin = data.value.admin
    localStorage.setItem("userData", JSON.stringify(data.value.name))
    localStorage.setItem("isUserAdmin", JSON.stringify(isAdmin))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let isUserAdmin = JSON.parse(localStorage.getItem("isUserAdmin"))
    login(userData, isUserAdmin);
    router.push("/admin/home");
  } else {
    console.log("Login Failed");
    loginFailed.value = "Login failed: Unknown error";
  }
}

</script>

<template>

<div class="login-container">
    <form class="login-form" @submit.prevent="handleSubmit">
      <h2>Admin Login <v-icon name="fa-regular-lightbulb" scale="2" animation="float"/></h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input name="email" type="email" id="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input name="password" type="password" id="password" placeholder="Enter your password" required />
      </div>
      <button :disabled="isLoading" type="submit" class="login-button">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <div class="login-failed" v-if="loginFailed">{{ loginFailed }}</div>
  </div>

<loader v-if="isLoading" />


</template>

<style lang="scss" scoped>


.login-container {
  background-color: #f8f8fa;
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  margin: 100px auto;
  padding: 20px;
  position: relative;

  @media only screen and (max-width: 440px) {
    border: 0;
    padding: 5px;
  }
}

h2 {
  padding: 0 0 20px 0;
  color: #ff6600;
  font-size: 26bpx;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333; 
}

.form-group input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.2s ease;
}

.form-group input:focus {
  border-color: #ff6600;
  outline: none;
}

.login-button {
  width: 50%;
  padding: 12px;
  background-color: #ff6600;
  color: #f8f8fa;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media only screen and (max-width: 440px) {
    width: 85%;
  }
}

.login-button:disabled {
  background-color: #e5e5e5;
}

.login-button:hover:not(:disabled) {
  background-color: #cf5300;
}

.login-failed {
  margin-top: 15px;
  color: #d9534f;
}

</style>