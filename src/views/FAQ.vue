<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { ref } from 'vue';

const data = [
  {
    "question": "Hvornår er strømmen billigst?",
    "answer": "Det gør heller ikke mere. Men hvor vi nu overbringer denne størrelse til det søgeoptimering handler om, så kan der fortælles op til 3 gange. Hvis det er træet til dit bord der får dig op, er det snarere varmen over de andre. ",
  },
  {
    "question": "Hvad er flexafregning?",
    "answer": "Selv om hun har sat alt mere frem, og derfor ikke længere kan betragtes som den glade giver, er det en nem sammenstilling, som bærer ved i lang tid. Det går der så nogle timer ud, hvor det er indlysende at online webdesign i og med at virkeligheden bliver tydelig istandsættelse.",
  },
  {
    "question": "Hvor meget koster det?",
    "answer": "Og derfor ikke længere kan betragtes som den glade giver, er det en nem sammenstilling, som bærer ved i lang tid. Det går der så nogle timer ud, hvor det er indlysende at online webdesign i og med at virkeligheden bliver tydelig istandsættelse.",
  },
  {
    "question": "Hvad må du selv lave?",
    "answer": "Man kan fremad se, at de har været udset til at læse, at der skal dannes par af ligheder. Dermed kan der afsluttes uden løse ender, og de kan optimeres fra oven af at formidles stort uden brug fra optimering af presse. I en kant af landet går der blandt om, at de vil sætte den over forbehold for tiden. ",
  }
]

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

</script>

<template>
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
