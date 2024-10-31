<script setup>
import { onMounted } from 'vue';

onMounted(()=>{

    const titleElement = document.getElementById("title");
    titleElement.innerHTML = titleElement.innerHTML.replace("STRØM", "<span style='color: #ff6600; font-weight: bold;'>STRØM</span>");
})

</script>

<template>

<div class="container">
    <h3 id="title">Lidt om STRØM</h3>
    <p>Lorems ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus quis sem lacinia nonummy. Proin mollis lorem non dolor. In hac habitasse platea dictumst. Nulla ultrices odio. Donec augue. Phasellus dui. Maecenas facilisis nisl vitae nibh. Proin vel seo est vitae eros pretium dignissim. Aliquam aliquam sodales orci. Suspendisse potenti. Nunc adipiscing euismod arcu. Quisque facilisis mattis lacus.</p>
    <RouterLink to="/about">Læs mere</RouterLink>
</div>

</template>

<style lang="scss" scoped>

.container{
    width: 100%;
    height: 450px;
    background-color: #f8f8fa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        font-size: calc(20px + 2vmin);
        font-weight: bold;
    }

    p{
        width: 80%;
        text-align: center;
        line-height: 24px;
        color: #676a73;
    }

    a{
        width: 160px;
        height: 50px;
        text-transform: uppercase;
        font-size: 18px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 3px solid #ff6600;
        display: flex;
        margin: 4vmin 0 0 0;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        transition: .2s ease-in;
        
        &:hover{
            background-color: transparent;
            color: #ff6600;
        }
    }
}

</style>