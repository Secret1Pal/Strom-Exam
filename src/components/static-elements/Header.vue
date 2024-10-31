<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const hasScrolled = ref(false)


onMounted(() => {
    const handleScroll = () => {
        if (!hasScrolled.value && window.scrollY >= 700) {
            console.log("Hello");
            hasScrolled.value = true;
        } else if (hasScrolled.value && window.scrollY < 700) {
            console.log("Back");
            hasScrolled.value = false;
        }
    };

    window.addEventListener('scroll', handleScroll);

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    });
});

</script>

<template>
    <header id="top" class="header">
        <div class="content">
            <figure>
                <img src="/images/logo.png" alt="STRØM logo">
            </figure>
            <ol>
                <li><v-icon name="fa-map-marker-alt" scale="0.7" fill="#ff6600"/>Strømparken 1, 8500 Grenaa</li>
                <li><v-icon name="fa-regular-clock" scale="0.7" fill="#ff6600"/>Man - fre 9.00 - 18.00</li>
                <li><v-icon name="fa-phone-alt" scale="0.7" fill="#ff6600"/>(+45) 86 45 45 78</li>
            </ol>
        </div>
    </header>
    <a href="#top" :class="{'top-btn': true, 'active': hasScrolled}">
        <v-icon name="fa-angle-up" scale="1.5" fill="#f8f8fa"/>
    </a>
</template>

<style lang="scss" scoped>

.header{
    width: 100%;
    padding: 10px 0 50px 0;
    background-color: #343742;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.content{
    width: 900px;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e5e5e5;

    @media only screen and (max-width: 665px) {
        flex-flow: column;
    }

    figure{
        height: 100%;
    }

    ol{
        list-style-type: none;
        display: flex;
        font-size: 12px;

        li{
            margin: 0 0 0 20px;

            svg{
                margin: 0 5px 0 0;
            }

            &:last-child{
                margin: 0 5px 0 20px;
            }
        }

        @media only screen and (max-width: 650px) {
            flex-flow: column;
            align-items: center;

            li{
                margin: 15px 0 0 0;

                &:last-child{
                    margin: 15px 0 0 0;
                }
            }
        }
    }
}

.top-btn{
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    background-color: #ff6600;
    border: 2px solid #ff6600;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    z-index: 960;
    transition: .3s ease;
    pointer-events: none;
    opacity: 0;

    &:hover{
        background-color: #f8f8fa;
        cursor: pointer;
        svg{
            fill: #ff6600;
        }
    }

    &.active{
        pointer-events: all;
        opacity: 1;
    }

    @media screen and (max-width: 450px) {
        bottom: 50px;
        right: 10px;
        width: 40px;
        height: 40px;
    }
}

</style>