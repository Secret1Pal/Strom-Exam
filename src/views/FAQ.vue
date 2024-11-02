<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { ref, onMounted } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/faq")
}

const selectedAccord = ref(null)
const AccordId = ref(null)

const triggerAccord = (event, id) =>{
    if(selectedAccord.value === null){
        selectedAccord.value = event.target
        AccordId.value = id
        selectedAccord.value.parentElement.classList.add("active")
    } else if(selectedAccord.value == event.target){
        selectedAccord.value.parentElement.classList.remove("active")
        selectedAccord.value = null
        AccordId.value = null
    } else if(selectedAccord.value !== null && selectedAccord.value != event.target){
        selectedAccord.value.parentElement.classList.remove("active")
        selectedAccord.value = event.target
        AccordId.value = id
        selectedAccord.value.parentElement.classList.add("active")
    }
}

onMounted(()=>{
    loadData()
})

</script>

<template>
<Loader v-if="isLoading"/>
<Breadcrumb title="FAQ - ofte stillede spørgsmål" nav="FAQ"/>

<div class="container">
    <div class="accordian" v-for="(item, id) in data" :key="id">
        <div class="question" @click="(event)=> triggerAccord(event, id)">
            {{ item.question }}
            <v-icon v-if="AccordId != id" name="fa-angle-down"/>
            <v-icon v-else name="fa-angle-up"/>
        </div>
        <div class="answer">{{ item.answer }}</div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    max-width: 900px;
    margin: 100px auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column nowrap;
    padding: 0 10px;

    @media screen and (max-width: 930px) {
        margin: 40px 0;
    }
}

.accordian{
    margin: 20px 0 0 0;
    width: 100%;
    user-select: none;

    .question{
        border: 2px solid #e5e5e5;
        background-color: #f8f8fa;
        border-radius: 6px;
        box-sizing: border-box;
        padding: 15px;
        height: 50px;
        transition: .4s ease-in-out;
        display: flex;
        justify-content: space-between;
        &:hover{
            cursor: pointer;
        }
    }

    .answer{
        overflow: hidden;
        border: 0 solid #f8f8fa;
        padding: 0 15px;
        box-sizing: border-box;
        max-height: 0;
        color: #676a73;
        transition: .4s ease-in-out;
        display: flex;
        align-items: center;
    }

    &.active{
        .question{
            border: 2px solid #ff6600;
            background-color: #ff6600;
            color: #f8f8fa;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        .answer{
            border: 2px solid #e5e5e5;
            border-top: 0;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            padding: 15px;
            max-height: 300px;
        }
    }

}

</style>
