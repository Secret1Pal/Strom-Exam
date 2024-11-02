<script setup>
import { onMounted, ref } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

const shuffledItems = ref([])

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/testimonial")
    let random = fisherYatesShuffle(data.value)
    shuffledItems.value = random.slice(0, 3)
}

function fisherYatesShuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

onMounted(()=>{
    loadData()
})

</script>
<template>
<Loader v-if="isLoading" />
<div class="container">
    <figure class="img-container">
        <img src="/images/backgroundimage.jpg" alt="Background image of windmills and a truck.">
    </figure>
    <div class="content">
        <h3>Vores <span>kunder siger</span></h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm tempor</p>
        <div class="line"></div>
    </div>
    <div class="testimonials">
        <div class="card" v-for="item in shuffledItems">
            <figure>
                <img :src="`http://localhost:5333/images/testimonial/${item.image}`" alt="Holy image">
            </figure>
            <div class="name">{{item.name}}</div>
            <div class="title">{{ item.title }}</div>
            <p>{{ item.review }}</p>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    height: 600px;
    background-color: #e5e5e5;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
}

.img-container{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 350px;
}

.content{
    position: absolute;
    inset: 0;
    width: 100%;
    height: 350px;
    background-color: #222222bd;
    backdrop-filter: blur(1px);
    display: flex;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        margin: 70px 0 0 0;
        color: #f8f8fa;
        font-size: calc(20px + 2vmin);

        span{
            color: #ff6600;
        }
    }

    p{
        font-size: 16px;
        width: 95%;
        text-align: center;
        color: #d4dae3;
        margin: 10px 0;
    }

    .line{
            margin: 20px 0 0 0;
            height: 2px;
            width: 50px;
            translate: -35px;
            background-color: #d4dae3;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                border: 2px solid #ff6600;
                border-radius: 50%;
                top: 1px;
                left: 120%;
                transform: translate(-50%, -50%);
                z-index: 8;
            }
            &::before{
                content: "";
                position: absolute;
                width: 50px;
                height: 2px;
                background-color: #d4dae3;
                top: 0;
                left: 140%;
            }
        }
}

.testimonials{
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;
    margin: 100px 0 0 0;

    .card{
        width: 280px;
        margin: 0 10px;
        min-height: 200px;
        background-color: #f8f8fa;
        z-index: 100;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 8px;

        figure{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #f8f8fa;
            transform: translate(0, -40px);
        }

        .name{
            transform: translate(0, -20px);
            font-size: 18px;
        }

        .title{
            transform: translate(0, -15px);
            color: #ff6600;
        }

        p{
            width: 95%;
            line-height: 20px;
            text-align: center;
            color: #676a73;
            transform: translate(0, -10px);
        }

        @media screen and (max-width: 930px) {
            
            &:nth-child(3){
                display: none;
            } 
        }

        @media screen and (max-width: 630px) {
            &:nth-child(2){
                display: none;
            }
        }
        
    }
}


</style>