<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
</script>
<template>
<Breadcrumb/>
    <div class="message">
        Non-existent page, try a different URL! ^-^
    </div>
</template>
<style lang="scss" scoped>

.message{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    height: 500px;
    font-size: 4.5vmin;
    padding: 0 15px;
}

</style>