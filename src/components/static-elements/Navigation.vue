<script setup>
import { ref, onMounted, watchEffect } from "vue"
import { remoteEvent } from '../remoteEvent';

const props = defineProps({
    flashOnly: {
        type: Boolean,
        default: false,
        required: false
    }
})

const menuActive = ref(false)
const hasScrolled = ref(false)
const navbar = ref(null)
const flashbangActive = ref(false)
const cancelFirstExecution = ref(true)

const flashbangLoading = () => {
    if(!cancelFirstExecution.value){
        menuActive.value = false
        flashbangActive.value = true
        window.scrollTo(0, 0)
        setTimeout(() => (flashbangActive.value = false), 500)
    } else {
        cancelFirstExecution.value = false
    }
};

watchEffect(() => {
    if (remoteEvent.triggerFlashbang) {
        flashbangLoading()
        remoteEvent.triggerFlashbang = false
    }
})

const handleSubmit = (event) =>{
    const query = new FormData(event.target);
  for (const [key, value] of query) {
    console.log(`${key}: ${value}`)
  }
}

onMounted(()=>{
    if(!props.flashOnly){
        const header = document.querySelector(".header").offsetHeight
        const scrollHeight = header + 10

        window.onscroll = () =>{
            if(!hasScrolled.value && window.scrollY >= scrollHeight){
                hasScrolled.value = true
                navbar.value.style.cssText = "position: fixed; top: 0;"
            } else if(hasScrolled.value && window.scrollY <= scrollHeight){
                hasScrolled.value = false
                navbar.value.style.cssText = "position: relative; top: none;"
            }
        }
    }
})

</script>

<template>
<div v-if="!props.flashOnly" class="container">
    <nav ref="navbar" class="navbar">
        <menu :class="{ 'active': menuActive}">
            <li :class="{ 'active': $route.path === '/'}"><RouterLink to="/">Forside</RouterLink></li>
            <li :class="{ 'active': $route.path === '/about'}"><RouterLink to="/about">Om os</RouterLink></li>
            <li :class="{ 'active': $route.path === '/service'}"><RouterLink to="service">Service</RouterLink></li>
            <li :class="{ 'active': $route.path === '/faq'}"><RouterLink to="/faq">FAQ</RouterLink></li>
            <li :class="{ 'active': $route.path === '/nyheder'}"><RouterLink to="/nyheder">Nyheder</RouterLink></li>
            <li :class="{ 'active': $route.path === '/contact'}"><RouterLink to="/contact">Kontakt os</RouterLink></li>
        </menu>
        <div class="burger" @click="menuActive = !menuActive">
            <img src="/images/submenu-icon.png" alt="Menu toggle Icon">
        </div>
        <form v-on:submit.prevent="handleSubmit">
            <input name="query" type="text" placeholder="Søg" required>
            <button type="submit"><v-icon name="fa-search" fill="#222"/></button>
        </form>
    </nav>
</div>
<div class="flashbang" :class="{'active': flashbangActive}">
    <img src="/images/preloader.gif" alt="Gif">
</div>
</template>

<style lang="scss" scoped>

.container{
    display: flex;
    justify-content: center;
    height: 0;
}

.flashbang{
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .4s ease-out;
    pointer-events: none;
    opacity: 0;
    z-index: 999;

    &.active{
        pointer-events: all;
        opacity: 1;
        transition: none;
    }
    
    img{
        width: 50px;
        height: 50px;
        user-select: none;
    }
}

.navbar{
    width: 900px;
    height: 70px;
    background-color: #f8f8fa;
    position: relative;
    bottom: 35px;
    border-radius: 7px;
    box-shadow: 0 0 10px #f8f8fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 950;

    .burger{
        display: none;
    }

    menu{
        list-style-type: none;
        display: flex;

        li{
            margin: 0 0 0 20px;

            a{
                color: #222;
                text-decoration: none;
                text-transform: uppercase;
                transition: .2s ease-in;
                font-size: 16px;

                &:hover{
                    color: #ff6600;
                }
            }

            &.active{
                a{
                    color: #ff6600;
                    pointer-events: none;
                }
            }
        }
    }

    form{
        position: relative;
        margin: 0 30px 0 0;
        width: 190px;
        height: 40px;

        input{
            width: 100%;
            height: 100%;
            padding: 0 0 0 10px;
            outline: none;
            border: 1px solid #e5e5e5;
            background-color: #f8f8fa;
            border-radius: 3px;
        }

        button{
            position: absolute;
            right: 0px;
            top: 50%;
            transform: translate(0, -50%);
            background-color: transparent;
            border: none;
        }
    }

    @media screen and (max-width: 765px) {
        width: 90%;

        .burger{
            display: block;
            background-color: #343742;
            padding: 10px 15px;
            margin: 0 0 0 20px;
            cursor: pointer;
        }

        menu{
            position: absolute;
            width: 100%;
            height: 0;
            flex-flow: column;
            background-color: #f8f8fa;
            border-radius: 5px;
            box-shadow: 0 0 10px #f8f8fa;
            transition: height .4s ease-in-out, padding .2s ease-in-out;
            pointer-events: none;
            overflow: hidden;
            top: 90%;

            &.active{
                height: 310px;
                pointer-events: all;
            }

            li{
                margin: 1px 20px 0 20px;
                padding: 15px 10px;
                background-color: #343742;
                transition: .2s ease-in;

                a{
                    color: #f8f8fa;
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                &.active{
                    background-color: #ff6600;
                    a{
                        color: #f8f8fa;
                        pointer-events: none;
                    }
                }
            }
        }
    }
}



</style>