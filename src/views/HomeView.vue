<script setup>
import { inject } from "vue"

const {userState, login, logout} = inject("user")
</script>

<template>
  <h1>Strom thingy matchy</h1>
  <RouterLink to="/about">About</RouterLink> <br>
  <RouterLink v-if="userState.isLoggedIn" to="/admin/home">Admin Home for {{ userState.userInfo.id }}</RouterLink>
</template>

<style lang="scss" scoped>



</style>