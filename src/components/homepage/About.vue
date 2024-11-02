<script setup>
import { onMounted } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/about")
    const titleElement = document.getElementById("title");
    titleElement.innerHTML = titleElement.innerHTML.replace("STRØM", "<span style='color: #ff6600; font-weight: bold;'>STRØM</span>");
}

onMounted(()=>{
    loadData()
})

</script>

<template>
<Loader v-if="isLoading" />
<div class="container">
    <h3 id="title">{{data?.title}}</h3>
    <p>{{ data?.teaser }}</p>
    <RouterLink to="/about">Læs mere</RouterLink>
</div>

</template>

<style lang="scss" scoped>

.container{
    width: 100%;
    height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        font-size: calc(20px + 2vmin);
        font-weight: bold;
    }

    p{
        max-width: 900px;
        text-align: center;
        line-height: 24px;
        color: #676a73;
    }

    a{
        width: 160px;
        height: 50px;
        text-transform: uppercase;
        font-size: 18px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 3px solid #ff6600;
        display: flex;
        margin: 4vmin 0 0 0;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        transition: .2s ease-in;
        
        &:hover{
            background-color: transparent;
            color: #ff6600;
        }
    }
}

</style>