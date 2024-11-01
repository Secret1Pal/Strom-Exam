<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import { onMounted, ref } from 'vue';

const html = ref("<p><strong>Hvem er vi <u>mon</u></strong></p><p>Derudover er vores el-firma eksperter inden for strømbesparende løsninger. Så ønsker du at spare på energien, har vi et bredt udvalg af produkter og komponenter til elinstallationer, som gavner både elregningen og miljøet.</p><ul><li>Antenneinstallation</li><li><strong>Varmepumper</strong></li><li><em>Solceller</em></li><li>Og meget andet ...</li></ul>")

onMounted(() => {

    const titleElement = document.getElementById("title");
    titleElement.innerHTML = titleElement.innerHTML.replace("STRØM", "<span style='color: #ff6600; font-weight: bold;'>STRØM</span>");
})
</script>

<template>
    <Breadcrumb title="Om os" nav="Om os" />

    <div :class="about.container">
        <h3 id="title">Lidt om STRØM</h3>
        <p>Lorems ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin
            mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui.
            Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales
            orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus.</p>
        <div :class="about.line"></div>
    </div>

    <div :class="about.secondContainer">
        <div :class="about.content">
            <div :class="about.title">Hvem er vi</div>
            <div :class="about.line"></div>
            <div :class="about.text" v-html="html"></div>
        </div>
        <figure>
            <img v-lazy data-src="/images/1.jpg" alt="">
        </figure>
    </div>

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
}

.secondContainer{
    width: 900px;
    height: 400px;
    margin: 0 auto;
    // background-color: red;
    display: flex;
    justify-content: space-between;

    .content{
        width: 450px;
        .title{
            font-size: 20px;
        }
        .text{
            line-height: 20px;
            ul,ol{
                margin: 0 0 0 20px;
            }
        }
        .line {
            margin: 10px 0;
            height: 2px;
            width: 40px;
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
                width: 40px;
                height: 2px;
                background-color: #d4dae3;
                top: 0;
                left: 140%;
            }
        }
    }

    figure{
        width: 450px;
        height: 300px;
        overflow: hidden;
        border-radius: 6px;
    }
}
</style>
