<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import Testimonial from '@/components/homepage/Testimonial.vue';
import Team from '@/components/homepage/Team.vue';
import { onMounted } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/about")
}

onMounted(() => {
    loadData()

    const titleElement = document.getElementById("title");
    titleElement.innerHTML = titleElement.innerHTML.replace("STRØM", "<span style='color: #ff6600; font-weight: bold;'>STRØM</span>");

    const subtitleElement = document.getElementById("subtitle");
    subtitleElement.innerHTML = subtitleElement.innerHTML.replace("Hvem er vi <u>mon</u>", "Hvem er vi mon<div class='line'></div>");
})
</script>

<template>
    <Loader v-if="isLoading" />
    <Breadcrumb title="Om os" nav="Om os" />

    <div :class="about.container">
        <h3 id="title">{{ data?.title }}</h3>
        <p>{{ data?.teaser }}</p>
        <div :class="about.line"></div>
    </div>

    <div :class="about.secondContainer">
        <div :class="about.content">
            <div id="subtitle" :class="about.text" v-html="data?.content"></div>
            <RouterLink to="/contact">Kontakt os</RouterLink>
        </div>
        <figure>
            <img v-lazy :data-src="`http://localhost:5333/images/about/${data?.image}`" alt="">
        </figure>
    </div>

    <Testimonial />

    <Team />

</template>

<style lang="scss" module="about">
.container {
    width: 100%;
    min-height: 250px;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    h3 {
        font-size: calc(20px + 2vmin);
        font-weight: bold;
    }

    p {
        max-width: 900px;
        text-align: center;
        line-height: 24px;
        color: #676a73;
        font-size: 14px;
    }

    .line {
        margin: 20px 0 0 0;
        height: 2px;
        width: 50px;
        translate: -35px;
        background-color: #d4dae3;
        position: relative;

        &::after {
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

        &::before {
            content: "";
            position: absolute;
            width: 50px;
            height: 2px;
            background-color: #d4dae3;
            top: 0;
            left: 140%;
        }
    }

    @media screen and (max-width: 940px) {
        min-height: 50px;
    }
}

.secondContainer{
    max-width: 900px;
    min-height: 400px;
    padding: 20px 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .content{
        max-width: 450px;
        .text{
            line-height: 22px;
            margin: 0 20px 0 0;
            color: #676a73;
            ul,ol{
                margin: 30px 0 0 20px;
                list-style-type: none;
                position: relative;
                li{
                    margin: 5px 0;
                }
                li::before{
                    content: "";
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    border: 2px solid #676a73;
                    position: absolute;
                    left: -20px;
                    transform: translate(0, 5px);
                }
            }

            p{
                &:nth-child(1){
                    font-size: 18px;
                    color: #222;
                }
            }

            div {
                margin: 10px 0;
                height: 2px;
                width: 50px;
                translate: 0px;
                background-color: #d4dae3;
                position: relative;

                &::after {
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

                &::before {
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
        a{
            text-decoration: none;
            display: inline-block;
            border: 2px solid #ff6600;
            background-color: #ff6600;
            color: #f8f8fa;
            text-transform: uppercase;
            border-radius: 5px;
            font-size: 14px;
            padding: 15px 25px;
            margin: 20px 0 0 0;
            transition: .2s ease-in;

            &:hover{
                cursor: pointer;
                background-color: transparent;
                color: #ff6600;
            }
        }
    }

    figure{
        max-width: 450px;
        height: 300px;
        overflow: hidden;
        border-radius: 6px;
    }

    @media screen and (max-width: 940px) {
        flex-flow: row wrap-reverse;
        figure{
            max-width: 500px;
            margin: 40px auto;
        }
    }
}
</style>
