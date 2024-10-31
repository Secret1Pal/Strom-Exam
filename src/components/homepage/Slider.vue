<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const html = ref("<p><span>Bedste chokolade</span><br />Vi matcher alle</p>")

const activeLeft = ref(true)
const activeRight = ref(true)
const currentIndex = ref(0);
const sliderOn = ref(null)
let pressAble = true;
let autoSlideInterval;

const moveSlide = (forward) => {
    const slides = document.querySelectorAll(".slide")
    if (pressAble) {
        if (forward) {
            activeLeft.value = !activeLeft.value
            currentIndex.value = (currentIndex.value + 1) % slides.length;
        } else {
            activeRight.value = !activeRight.value
            currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
        }
        setSlidePosition();
    }
}

const setSlidePosition = () => {
    const slides = document.querySelectorAll(".slide")
    slides.forEach((slide, index) => {
        if (index === currentIndex.value) {
            slide.style.transition = ".8s ease";
            slide.style.opacity = "1";
            slide.style.transform = "translateX(0%)";
            slide.style.zIndex = 10;
        } else if (index === (currentIndex.value + 1) % slides.length) {
            slide.style.transition = ".8s ease";
            slide.style.opacity = "1";
            slide.style.transform = "translateX(100%)";
            slide.style.zIndex = 5;
        } else if (index === (currentIndex.value - 1 + slides.length) % slides.length) {
            slide.style.transition = ".8s ease";
            slide.style.opacity = "1";
            slide.style.transform = "translateX(-100%)";
            slide.style.zIndex = 5;
        } else {
            slide.style.transition = "none";
            slide.style.transform = "translateX(100%)";
            slide.style.opacity = "0";
            slide.style.zIndex = 5;
        }
    });

    pressAble = false;
    setTimeout(() => {
        (pressAble = true)
        activeLeft.value = false
        activeRight.value = false
    }, 400);
}

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => moveSlide(true), 5000);
}

const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
}

onMounted(() => {
    setSlidePosition();
    if(window.innerWidth > 500){
        startAutoSlide();
    }
});

onBeforeUnmount(() => {
    stopAutoSlide();
});

</script>

<template>

    <div :class="slider.container">
        <div class="slide">
            <img src="/images/slider/1.jpg">
            <div :class="slider.text" v-html="html">
                
            </div>
        </div>
        <div class="slide">
            <img v-lazy data-src="/images/slider/2.jpg">
            <div :class="slider.text" v-html="html">
                
            </div>
        </div>
        <div class="slide">
            <img v-lazy data-src="/images/slider/3.jpg">
            <div :class="slider.text" v-html="html">
                
            </div>
        </div>
        <RouterLink :class="{[slider.activeLeft]: activeLeft, [slider.activeRight]: activeRight}" to="/about">Kontakt os</RouterLink>
        <section>
            <v-icon @click="moveSlide(false)" name="fa-arrow-circle-left" fill="#f8f8fa"/>
            <v-icon @click="moveSlide(true)" name="fa-arrow-circle-right" fill="#f8f8fa"/>
        </section>
    </div>

</template>

<style lang="scss" module="slider">

.container {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;

    @media screen and (max-width: 770px) {
        width: 100%;
        height: 80vw;
    }

    div{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #22222281;
        pointer-events: none;

        .text{
            padding: 0 0 100px 0;
            text-align: center;
            p{
                color: #f8f8fa;
                font-size: 18px;

                span{
                    font-size: 52px;

                    @media screen and (max-width: 560px) {
                        font-size: calc(20px + 2vw);
                    }
                }
            }
        }
    }

    a{
        position: absolute;
        inset: 50%;
        z-index: 700;
        transform: translate(-50%, 50%);
        width: 200px;
        height: 60px;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 20px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 4px solid #ff6600;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        transition: background-color .3s ease-in, transform .4s ease-in;
        
        &:hover{
            background-color: #ff660050;
        }

        &.activeLeft{
            transform: translate(100%, 50%);
        }

        &.activeRight{
            transform: translate(-150%, 50%);
        }

        @media screen and (max-width: 900px){
            display: none;
        }
    }

    section{
        position: absolute;
        width: 100%;
        height: 50px;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 800;

        svg{
            height: 100%;
            width: auto;
            margin: 0 20px;
            cursor: pointer;
            opacity: 0;
            transition: .5s ease-out;
        }

        @media screen and (max-width: 500px) {
            display: none;
        }
    }

    &:hover section{
        svg{
            opacity: 1;
        }
    }
}


</style>