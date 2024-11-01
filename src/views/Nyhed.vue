<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import rawData from "../assets/json/news.json"

const sortedData = ref(rawData.sort((a, b) => new Date(b.received) - new Date(a.received)));

const latestNews = computed(() => {return sortedData.value.slice(0, 4)})

const route = useRoute()
const id = ref(route.params.id)
const data = ref(rawData[0])

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

</script>

<template>
<Breadcrumb nav="Ny lærling" title="Ny lærling" middle-nav="Nyheder" middle-route="nyheder"/>

<div class="container">
    <div class="content-container">
        <div class="archive-container">
            <div class="archive-title">Arkiv</div>
            <div class="archives">
                <div class="archive" v-for="item in latestNews">
                    <figure>
                        <RouterLink :to="{ name: 'nyhed', params: { id: item._id.$oid } }">
                        <img :src="`/images/news/${item.image}`" alt="">
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
                <div class="date">{{ formatDate(data.received) }}</div>
                <figure>
                    <img :src="`/images/news/${data.image}`" alt="">
                </figure>
                <div class="card-content">
                    <v-icon name="fa-regular-comments"/> {{ data.comments.length }} Kommentar
                    <div class="title">{{ data.title }}</div>
                    <div class="line"></div>
                    <p v-html="data.content"></p>
                </div>
            </div>
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

</style>