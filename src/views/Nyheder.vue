<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import rawData from "../assets/json/news.json"
import { ref, computed } from 'vue';

const sortedData = ref(rawData.sort((a, b) => new Date(b.received) - new Date(a.received)));

const currentPage = ref(1);
const itemsPerPage = 4;

const latestNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedData.value.slice(start, start + itemsPerPage);
});

const archiveNews = computed(() => {
  const start = currentPage.value === 1 ? itemsPerPage : 0;
  return sortedData.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage));

const paginationPages = computed(() => {
  const total = totalPages.value
  const pages = []

  if (total <= 1) return pages

  pages.push(1)

  let start = Math.max(currentPage.value - 1, 2)
  let end = Math.min(currentPage.value + 1, total - 1)

  const neededPages = 3

  if (end - start + 1 < neededPages) {
    if (start === 2) {
      end = Math.min(start + neededPages - 1, total - 1)
    } else {
      start = Math.max(end - neededPages + 1, 2)
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (total > 1 && !pages.includes(total)) {
    pages.push(total)
  }

  return pages
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    console.log(archiveNews.value)
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function setPage(pageNum){
  if(pageNum > totalPages || pageNum < 1){
    return console.log("Page does not exist")
  }
  currentPage.value = pageNum
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

function formatCutText(text) {
    const charLimit = 90;
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

</script>

<template>
<Breadcrumb title="Nyheder" nav="Nyheder"/>

<div class="container">
    <div class="content-container">
        <div class="archive-container">
            <div class="archive-title">Arkiv</div>
            <div class="archives">
                <div class="archive" v-for="item in archiveNews">
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
            <div class="card" v-for="item in latestNews">
                <div class="date">{{ formatDate(item.received) }}</div>
                <figure>
                    <RouterLink :to="{ name: 'nyhed', params: { id: item._id.$oid } }">
                    <img :src="`/images/news/${item.image}`" alt="">
                    </RouterLink>
                </figure>
                <div class="card-content">
                    <div class="title">{{ item.title }}</div>
                    <p v-html="formatCutText(item.content)"></p>
                    <div class="line"></div>
                    <v-icon name="fa-regular-comments"/> {{ item.comments.length }} Kommentar
                </div>
            </div>
        </div>
        <div class="pagination">
            <button class="pagination-info" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <div v-for="(item, id) in paginationPages" :key="id" @click="setPage(item)" :class="{'active': currentPage == item, 'pagination-info': true}">{{ item }}</div>
            <button class="pagination-info" @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
}

.card-container{
    max-width: 600px;
    display: flex;
    justify-content: flex-start;
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

        .card-content{
            padding: 15px 10px;

            .title{
                font-size: 18px;
                font-weight: bold;
            }

            p{
                margin: 20px 0 0 0;
                font-size: 16px;
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
        padding: 0 20px;
        max-width: 100%;

        .card{
            flex-grow: 1;
        }
    }

    @media screen and (max-width: 340px) {
        padding: 0;

        .card{
            border-radius: 0;
        }
    }
}

.pagination {
    display: flex;
    width: 100%;
    margin-top: 30px;

    .pagination-info{
        background-color: #f8f8fa;
        color: #222;
        padding: 10px 20px;
        margin: 0 5px;
        border: 2px solid #e5e5e5;
        border-radius: 5px;
        transition: .2s ease-in;

        &:disabled {
            background-color: #e5e5e5;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            border: 2px solid #f8f8fa;
            background-color: #ff6600;
            color: #f8f8fa;
            cursor: pointer;
        }

        &.active{
            border: 2px solid #f8f8fa;
            background-color: #ff6600;
            color: #f8f8fa;
        }
    }

    @media screen and (max-width: 930px) {
        justify-content: center;
        

        .pagination-info{
            background-color: #f8f8fa;
            color: #222;
            padding: 10px 6px;
            margin: 0 5px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            transition: .2s ease-in;
            font-size: 14px;

            &:disabled {
                background-color: #e5e5e5;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                border: 1px solid #f8f8fa;
                background-color: #ff6600;
                color: #f8f8fa;
                cursor: pointer;
            }

            &.active{
                border: 1px solid #f8f8fa;
                background-color: #ff6600;
                color: #f8f8fa;
            }
        }
    }
}

</style>