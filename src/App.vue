<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { reactive, provide, onMounted } from "vue"
import Header from './components/static-elements/Header.vue';
import Navigation from './components/static-elements/Navigation.vue';
import Footer from './components/static-elements/Footer.vue';

const router = useRouter()

const userState = reactive({
  isLoggedIn: false,
  isAdmin: false,
  userInfo: {}
});


const login = (userData, isAdmin = false) => {
  userState.isLoggedIn = true;
  userState.isAdmin = isAdmin;
  userState.userInfo = { ...userData };
};

const logout = () => {
  userState.isLoggedIn = false;
  userState.isAdmin = false;
  userState.name = '';
  localStorage.clear()
  router.push("/")
};

// Provide the user state and methods globally
provide('user', { userState, login, logout });

const loadUserInfo = () =>{
  let userData = JSON.parse(localStorage.getItem("userData"))
  let isUserAdmin = JSON.parse(localStorage.getItem("isUserAdmin"))
  if(userData){
    login(userData, isUserAdmin);
  }
}

onMounted(()=>{
  loadUserInfo()
})

</script>

<template>
  <Header />
  <Navigation />
  <div class="space"></div>
  <RouterView />
  <Footer />
</template>

<style>

.space{
  height: 1500px;
}

</style>
