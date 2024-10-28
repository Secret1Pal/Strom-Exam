<script setup>
import { inject, ref } from "vue"
import { useRouter } from "vue-router"
import useRequestData from "@/hook/useRequestData"; 

const {makeRequest, data, isLoading, error} = useRequestData()

const {userState, login, logout} = inject("user")

import Loader from "../assets/Loader.vue"

const router = useRouter()

const signinFailed = ref("")

const handleSubmit = async (event) => {
  const newPost = new FormData(event.target);
  for (const [key, value] of newPost) {
    console.log(`${key}: ${value}`)
  }
  await makeRequest("https://jsonplaceholder.typicode.com/posts", "POST", newPost);

  if (error.value) {
    signinFailed.value = error.value;
  } else if (data.value) {
    let isAdmin = false
    localStorage.setItem("userData", JSON.stringify(data.value))
    localStorage.setItem("isUserAdmin", JSON.stringify(isAdmin))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let isUserAdmin = JSON.parse(localStorage.getItem("isUserAdmin"))
    login(userData, isUserAdmin);
    router.push("/admin/home");
  } else {
    console.log("Sign-in Failed");
    signinFailed.value = "Sign-in failed: Unknown error";
  }
}

</script>

<template>

<div class="signin-container">
    <form class="signin-form" @submit.prevent="handleSubmit">
      <h2>Sign-in <v-icon name="fa-vuejs" scale="2" animation="float"/></h2>
      <div class="form-group">
        <label for="name">Name:</label>
        <input name="name" type="text" id="name" placeholder="Enter your name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input name="email" type="email" id="email" placeholder="Enter your email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input name="password" type="password" id="password" placeholder="Enter your password" required />
      </div>
      <button :disabled="isLoading" type="submit" class="signin-button">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Login</span>
      </button>
    </form>
    <div class="signin-failed" v-if="signinFailed">{{ signinFailed }}</div>
  </div>

<loader v-if="isLoading" />


</template>

<style lang="scss" scoped>


.signin-container {
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  top: 100px;
  position: relative;

  @media only screen and (max-width: 440px) {
    border: 0;
    box-shadow: none;
    padding: 5px
  }
}

h2 {
  padding: 0 0 20px 0;
  color: #42b983;
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
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: 0.2s ease;
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

.signin-button {
  width: 50%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media only screen and (max-width: 440px) {
    width: 85%;
  }
}

.signin-button:disabled {
  background-color: #a0a0a0;
}

.signin-button:hover:not(:disabled) {
  background-color: #368a6b;
}

.signin-failed {
  margin-top: 15px;
  color: #d9534f;
}

</style>