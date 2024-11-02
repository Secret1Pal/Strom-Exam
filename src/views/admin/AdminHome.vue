<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { userState, login, logout } = inject("user");

if (!userState.isLoggedIn) {
  router.push("/");
}
</script>

<template>
  <h1 v-if="!userState.isLoggedIn">Access Denied</h1>
  <template v-else>
    <div class="logout" @click="logout">Logout<v-icon name="fa-sign-out-alt" fill="#222" scale="1.2" /></div>
    <div class="home" @click="router.push('/')"><v-icon name="fa-home" fill="#222" scale="1.2" />Home</div>

    <div class="container">
      <div class="box">
        <div class="title">"About"endpoint</div>
        <div class="text">Lorem, ipsum dolor sit amet consectetur nemo quos consequatur laborum corporis sequi ullam fugit eaque voluptatem!</div>
        <div class="editable">Capability: Edit</div>
        <RouterLink to="/admin/about">To Endpoint</RouterLink>
      </div>
      <div class="box">
        <div class="title">"News"endpoint</div>
        <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores nemo quos consequatur laborum corporis sequi ullam fugit eaque voluptatem!</div>
        <div class="editable">Capability: Edit, Create & Delete</div>
        <RouterLink to="/admin/news">To Endpoint</RouterLink>
      </div>
      <div class="box">
        <div class="title">"Booking"endpoint</div>
        <div class="text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem maiores nemo quos consequatur laborum corporis sequi ullamQuidem maiores nemo quos consequatur laborum corporis sequi ullam</div>
        <div class="editable">Capability: Edit & Delete</div>
        <RouterLink to="/admin/home">To Endpoint</RouterLink>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>

.container{
  max-width: 900px;
  margin: 100px auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  flex-flow: row wrap;
  align-items: stretch;
}

.box{
  width: 280px;
  border: 2px solid #ff6600;
  box-sizing: border-box;
  padding: 7px;
  border-radius: 7px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  .title{
    font-size: 22px;
    text-align: center;
  }

  .text{
    color: #676a73;
    margin: 10px 0;
  }
  .editable{
    font-style: italic;
    color: #676a73;
  }
  a{
    display: block;
    margin: 10px auto;
    text-decoration: none;
    text-transform: uppercase;
    background-color: #ff6600;
    border: 2px solid #ff6600;
    padding: 10px 20px;
    color: #f8f8fa;
    border-radius: 6px;
    transition: .2s ease-in;

    &:hover{
      background-color: #f8f8fa;
      color: #ff6600;
      cursor: pointer;
    }
  }
}


.logout {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 100;
  color: #222;
  font-size: 18px;

  svg {
    margin: 0 5px;
  }

  &:hover {
    color: #676a73;
    cursor: pointer;

    svg {
      fill: #676a73;
    }
  }
}
.home {
  position: absolute;
  top: 10px;
  left: 15px;
  z-index: 100;
  color: #222;
  font-size: 18px;

  svg {
    margin: 0 5px;
  }

  &:hover {
    color: #676a73;
    cursor: pointer;

    svg {
      fill: #676a73;
    }
  }
}
</style>
