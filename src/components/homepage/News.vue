<script setup>
import { onMounted, ref } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

const sortedData = ref([])

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/news")
    sortedData.value = data.value.sort((a, b) => new Date(b.received) - new Date(a.received))
    sortedData.value = sortedData.value.slice(0, 3)
}

function formatDate(dateString) {
  const date = new Date(dateString) 
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-GB', { month: 'short' })
  return `${day} ${month}`
}

function formatCutText(text) {
    const charLimit = 100;
    if (text.length > charLimit) {
        let newText = text.slice(0, charLimit);
        const lastSpace = newText.lastIndexOf(" ");
        if (lastSpace !== -1) {
            newText = newText.slice(0, lastSpace); // Trim to the last whole word
        }
        return `${newText}...`;
    }
    return text;
}

onMounted(()=>{
    loadData()
})

</script>
<template>
<Loader v-if="isLoading" />
<div class="container">
    <div class="content">
        <h3>Sidste <span>nyt</span></h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm tempor incididunt</p>
        <div class="line"></div>
    </div>
    <div class="card-container">
        <div class="card" v-for="item in sortedData">
            <div class="date">{{ formatDate(item.received) }}</div>
            <figure>
                <RouterLink :to="{ name: 'nyhed', params: { id: item._id } }">
                    <img v-lazy :data-src="`http://localhost:5333/images/news/${item.image}`" alt="">
                </RouterLink>
            </figure>
            <div class="title">{{ item.title }}</div>
            <p>{{ formatCutText(item.content) }}</p>
        </div>
    </div>
    <RouterLink to="/nyheder" class="link">Flere nyheder</RouterLink>
</div>
</template>

<style lang="scss" scoped>

.container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    padding: 70px 0;

    
}

.content{
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        margin: 10px 0 0 0;
        font-size: calc(20px + 2vmin);
        font-weight: bold;

        span{
            color: #ff6600;
            font-weight: bold;
        }
    }

    p{
        font-size: 16px;
        width: 95%;
        text-align: center;
        color: #676a73;
        margin: 10px 0;
    }

    .line{
            margin: 10px 0 0 0;
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

.card-container{
    max-width: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap row;
    gap: 20px;

    .card{
        width: 280px;
        min-height: 200px;
        overflow: hidden;
        box-shadow: 0 0 10px #2222225d;
        border-radius: 6px;
        position: relative;
        transition: .3s ease;

        .date{
            position: absolute;
            background-color: #ff6600;
            left: 15px;
            top: 15px;
            color: #f8f8fa;
            font-size: 16px;
            width: 30px;
            text-align: center;
            padding: 5px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            z-index: 100;

            &::after{
                content: "";
                position: absolute;
                bottom: -12px;
                left: 0;
                width: 0;
                height: 0;
                border-right: 20px solid transparent;
                border-top: 12px solid #ff6600;
            }

            &::before{
                content: "";
                position: absolute;
                bottom: -12px;
                right: 0;
                width: 0;
                height: 0;
                border-left: 20px solid transparent;
                border-top: 12px solid #ff6600;
            }
        }

        figure{
            width: 100%;
            height: 200px;
            overflow: hidden;
            img{
                &:hover{
                    scale: 1.1;
                }
            }
        }

        .title{
            margin: 15px 0 0 10px;
            font-size: 18px;
            font-weight: bold;
        }

        p{
            margin: 10px 10px;
            font-size: 16px;
            color: #676a73;
            line-height: 22px;
        }

        &:hover{
            box-shadow: 0 0 10px #222222d7;
        }

    }
}

.link{
        width: 180px;
        height: 40px;
        text-transform: uppercase;
        font-size: 16px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 3px solid #ff6600;
        display: flex;
        margin: 40px 0 0 0;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        transition: .2s ease-in;
        
        &:hover{
            background-color: transparent;
            color: #ff6600;
        }
    }

</style>