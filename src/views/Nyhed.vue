<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()
const {data: singleData, makeRequest: singleRequest, isLoading: singleLoading} = useRequestData()

const route = useRoute()
const id = ref(route.params.id)
const sortedData = ref([])

watch(() => route.params.id, () => {
    location.reload()
})

async function loadData(){
    await singleRequest("http://127.0.0.1:5333/news/" + id.value)
    await makeRequest("http://127.0.0.1:5333/news")
    let random = fisherYatesShuffle(data.value)
    sortedData.value = random.slice(0, 4)
}

const latestNews = computed(() => {return sortedData.value.slice(0, 4)})

const handleSubmit = (event) =>{
    const fd = new FormData(event.target);
    for (const [key, value] of fd) {
        console.log(`${key}: ${value}`)
    }
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

function formatDate(dateString) {
  const date = new Date(dateString) 
  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-GB', { month: 'short' })
  return `${day} ${month}`
}

function formatDateWYear(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

function formatDateWYearMonthFirst(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

onMounted(()=>{
    loadData()
})

</script>

<template>
<Loader v-if="isLoading || singleLoading" />
<Breadcrumb :nav="singleData?.title" :title="singleData?.title" middle-nav="Nyheder" middle-route="nyheder"/>

<div class="container">
    <div class="content-container">
        <div class="archive-container">
            <div class="archive-title">Arkiv</div>
            <div class="archives">
                <div class="archive" v-for="item in latestNews">
                    <figure>
                        <RouterLink :to="{ name: 'nyhed', params: { id: item._id } }">
                            <img :src="`http://localhost:5333/images/news/${item.image}`" :alt="`Image for news article: ${item.title}`">
                        </RouterLink>
                    </figure>
                    <div class="archive-content">
                        <div class="title">{{ item.title }}</div>
                        <div class="date"><v-icon name="fa-calendar-alt" />{{ formatDateWYear(item.received) }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-container">
            <div class="card">
                <div class="date">{{ formatDate(singleData?.received) }}</div>
                <figure>
                    <img :src="`http://localhost:5333/images/news/${singleData?.image}`" alt="">
                </figure>
                <div class="card-content">
                    <v-icon name="fa-regular-comments"/> {{ singleData?.comments.length }} Kommentar
                    <div class="title">{{ singleData?.title }}</div>
                    <div class="line"></div>
                    <p v-html="singleData?.content"></p>
                </div>
            </div>
        </div>
        <div class="comments">
            <div class="title">Kommentarer ({{ singleData?.comments.length }})</div>
            <div class="comment" v-for="item in singleData?.comments">
                <div class="name">{{ item.name }}</div>
                <div class="date"><v-icon name="fa-calendar-alt"/>{{ formatDateWYearMonthFirst(item.received) }}</div>
                <div class="text">{{ item.comment }}</div>
            </div>
        </div>
        <div class="write-comment">
            <div class="title">Skriv en kommentar</div>
            <form v-on:submit.prevent="handleSubmit">
                <input type="text" name="name" placeholder="Navn" required>
                <input type="email" name="email" placeholder="Email" required>
                <textarea name="comment" placeholder="Kommentar" required></textarea>
                <button type="submit">Send besked</button>
            </form>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    min-height: 400px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
}

.archive-container{
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column nowrap;

    .archive-title{
        font-size: 24px;
    }

    .archives{
        .archive{
            display: flex;
            padding: 18px 0;
            border-bottom: 2px solid #e5e5e5;
            &:last-child{
                border-bottom: none;
            }
            figure{
                width: 100px;
                height: 80px;
                border-radius: 8px;
                overflow: hidden;

                &:hover{
                    img{
                        scale: 1.1;
                    }
                }
            }
            .archive-content{
                padding: 5px;
                box-sizing: border-box;
                display: flex;
                flex-flow: column nowrap;
                justify-content: space-between;
                .title{
                    font-size: 18px;
                }
                .date{
                    color: #676a73;
                }
            }
        }
    }

    @media screen and (max-width: 930px) {
        width: 100%;
        align-items: center;
        margin: 0 0 50px 0;

        .archive-title{
            font-size: 28px;
        }

        .archives{
            display: flex;
            justify-content: center;
            flex-flow: row wrap;
            .archive{
                flex: 1;
                height: 100px;
                margin: 18px;
                padding: 0;
                border-radius: 8px;
                border-bottom: none;
                box-shadow: 0 0 5px #2222227c;
                figure{
                    width: 150px;
                    height: 100px;
                }
            }
        }
    }
}

.content-container{
    max-width: 900px;
    display: flex;
    flex-flow: row-reverse wrap;
    justify-content: center;
}

.card-container{
    max-width: 600px;
    display: flex;

    .card{
        width: 550px;
        margin: 0 50px 0 0;
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
            width: 40px;
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
            height: auto;
            overflow: hidden;
        }

        .card-content{
            padding: 20px;

            .title{
                font-size: 32px;
                margin: 10px 0 0 0;
            }

            p{
                margin: 20px 0 0 0;
                font-size: 14px;
                color: #676a73;
                line-height: 22px;
            }

            .line{
                width: 100%;
                height: 2px;
                background-color: #e5e5e5;
                border-radius: 5px;
                margin: 20px 0;
            }
        }
        

        &:hover{
            box-shadow: 0 0 10px #222222d7;
        }

    }

    @media screen and (max-width: 930px) {
        width: 100%;

        .card{
            width: 100%;
            margin: 0;
        }
    }

    @media screen and (max-width: 620px) {
        .card{
            border-radius: 0;

            .card-content{
                padding: 10px;
            }
        }
    }
}

.comments{
    width: 550px;
    margin: 70px 350px 0 0;
    padding: 0 0 30px 0;
    justify-self: flex-start;
    border-bottom: 2px solid #e5e5e5;
    .title{
        font-size: 22px;
        font-weight: bold;
    }
    .comment{
        padding: 10px 20px;
        .name{
            font-size: 18px;
        }
        .date{
            color: #676a73;
            margin: 10px 0;
            svg{
                margin: 0 5px 0 0;
            }
        }
        .text{
            color: #676a73;
            line-height: 20px;
        }
    }
    @media screen and (max-width: 930px) {
        width: 100%;
        margin: 70px 10px;
    }
}

.write-comment{
    width: 550px;
    margin: 70px 350px 0 0;
    padding: 0 0 30px 0;
    .title{
        font-size: 22px;
    }
    input,textarea{
        box-sizing: border-box;
        outline: none;
        border: 2px solid #e5e5e5;
        background-color: #f8f8fa;
        border-radius: 3px;
        transition: .2s ease;

        &:focus{
            border: 2px solid #222;
        }
    }
    input{
        width: 250px;
        margin: 20px 25px 0 0;
        padding: 10px;
        &:nth-child(2){
            margin: 20px 0 0 25px;
        }
    }
    textarea{
        min-height: 200px;
        width: 100%;
        padding: 10px;
        margin: 20px 0;
        resize: vertical;
        font-family: Arial, Helvetica, sans-serif;
    }
    button{
        background-color: #ff6600;
        border: 2px solid #ff6600;
        color: #f8f8fa;
        padding: 10px 20px;
        text-transform: uppercase;
        border-radius: 3px;
        transition: .2s ease-in;

        &:hover{
            background-color: #f8f8fa;
            color: #ff6600;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 930px) {
        width: 100%;
        margin: 0 10px;

        input{
            width: 250px;
            margin: 20px 25px 0 0;
            padding: 10px;
            &:nth-child(2){
                margin: 20px 0 0 0;
            }
        }
    }
}

</style>