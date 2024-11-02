<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { reactive, provide, onMounted, computed } from "vue"
import Header from './components/static-elements/Header.vue';
import Navigation from './components/static-elements/Navigation.vue';
import Footer from './components/static-elements/Footer.vue';
import useRequestData from './hook/useRequestData';
import Loader from './assets/Loader.vue';

const router = useRouter()
const route = useRoute()

const {makeRequest, isLoading} = useRequestData()

const userState = reactive({
  isLoggedIn: false,
  isAdmin: false,
  userInfo: {}
})


const login = (userData, isAdmin = false) => {
  userState.isLoggedIn = true
  userState.isAdmin = isAdmin
  userState.userInfo = { ...userData }
};

const logout = () => {
  if(confirm("Are you sure you want to logout?")){
    makeRequest("http://127.0.0.1:5333/login/logout")
    userState.isLoggedIn = false
    userState.isAdmin = false
    userState.name = ''
    localStorage.clear()
    router.push("/")
  } else return
};

// Provide the user state and methods globally
provide('user', { userState, login, logout })

const loadUserInfo = () =>{
  let userData = JSON.parse(localStorage.getItem("userData"))
  let isUserAdmin = JSON.parse(localStorage.getItem("isUserAdmin"))
  if(userData){
    login(userData, isUserAdmin)
  }
}

const isAdminRoute = computed(() => route.path.startsWith('/admin/'))

onMounted(()=>{
  loadUserInfo()
})

</script>

<template>
  <Loader v-if="isLoading"/>
  <Header v-if="!isAdminRoute"/>
  <Navigation :flash-only="isAdminRoute"/>
  <RouterView />
  <Footer v-if="!isAdminRoute"/>
</template>

<style>

.space{
  height: 1000px;
}

</style>
