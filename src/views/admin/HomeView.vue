<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const lastScrollY = ref(0);
const isHidden = ref(false);
const currentTarget = ref("")

const router = useRouter();

const { userState, login, logout } = inject("user");

if (!userState.isLoggedIn) {
  router.push("/");
}

const handleScroll = () => {
  if (window.scrollY > lastScrollY.value) {
    isHidden.value = true;
  } else {
    isHidden.value = false;
  }
  lastScrollY.value = window.scrollY;
};
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const addActive = (event) =>{
    if(currentTarget.value == ""){
        currentTarget.value = event.currentTarget
        currentTarget.value.classList.add("active")
    } else if(currentTarget.value == event.currentTarget){
        currentTarget.value.classList.remove("active")
    } else {
        currentTarget.value.classList.remove("active")
        currentTarget.value = event.currentTarget
        currentTarget.value.classList.add("active")
    }
}

</script>

<template>
  <h1 v-if="!userState.isLoggedIn">Access Denied</h1>
  <template v-else>
    <div class="logout" @click="logout">Logout</div>
    <div class="home" @click="router.push('/')">Home</div>
    <nav :class="{ hidden: isHidden }">
      <h2 class="nav-title">Admin Panel</h2>
      <ol>
        <li @click="addActive">Home</li>
        <li @click="addActive">News</li>
        <li @click="addActive">About</li>
        <li @click="addActive">Contact</li>
      </ol>
    </nav>
  </template>
</template>

<style lang="scss" scoped>

nav {
    height: 150px;
    width: 100%;
    background-color: #42b983;
    position: fixed;
    top: 0;
    transition: 0.4s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    &.hidden {
        top: -150px;
    }

    .nav-title {
        color: #fff;
        margin: 15px 0 0 0;
        font-size: 28px;
        text-align: center;
    }

    ol {
        display: flex;
        padding: 0;
        margin: 0;
        height: 100%;
        align-items: flex-end;
        flex-flow: row wrap;

        li {
            color: #fff;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            margin: 0 10px;
            padding: 0 10px;
            position: relative;
            
            &::before{
                content: "";
                position: absolute;
                bottom: 10px;
                left: 0;
                background-color: #fff;
                width: 0%;
                height: 4px;
                border-radius: 4px;
                transition: .3s ease-in;
            }

            &.active::before{
                content: "";
                width: 100%;
            }
        }
    }

}

.logout{
    position: absolute;
    top: 10px;
    right: 15px;
    z-index: 100;
    color: #111;
    font-size: 18px;
    cursor: pointer;
}

.home{
    position: absolute;
    top: 10px;
    left: 15px;
    z-index: 100;
    color: #111;
    font-size: 18px;
    cursor: pointer;
}

</style>
