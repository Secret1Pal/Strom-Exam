<script setup>

const props = defineProps({
    title:{
        required: false,
        default: "404 Error",
        type: String
    },
    nav: {
        type: String,
        required: false,
        default: "Land of Oz"
    },
    middleNav:{
        required: false,
        default: "",
        type: String
    },
    middleRoute:{
        required: false,
        default: "",
        type: String
    }
})

</script>
<template>

<div class="breadcrumb-container">
    <div class="breadcrumb-content">
        <div class="back"><RouterLink to="/admin/home">Home</Routerlink></div>
        <div class="breadcrumb-title">{{props.title}}</div>
        <div class="breadcrumb">
            <RouterLink to="/admin/home">Home</Routerlink>
            <v-icon name="fa-angle-right" fill="#777" scale=".8"/>
            <span v-if="!props.middleRoute">{{ props.nav }}</span>
            <RouterLink :to="'/' + props.middleRoute">{{ props.middleNav }}</Routerlink>
            <v-icon v-if="props.middleRoute" name="fa-angle-right" fill="#777" scale=".8"/>
            <span v-if="props.middleRoute">{{ props.nav }}</span>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.breadcrumb-container{
    position: relative;
    background-color: #e5e5e5;
    padding: 60px 10px 40px 10px;
}

.back{
    position: absolute;
    top: 20px;
    font-style: italic;

    a{
        font-size: 16px;
        color: #676a73;
        text-decoration: none;

        &:hover{
            color: #222;
        }
    }
}

.breadcrumb-content{
    max-width: 900px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;

    .breadcrumb-title{
        font-weight: bold;
        font-size: 34px;
    }

    .breadcrumb{
        margin: 10px 0 0 0;
        a{
            color: #777;
            text-decoration: none;
            transition: .2s ease-in;

            &:hover{
                color: #ff6600;
            }
        }

        &:last-child{
            color: #ff6600;
        }
    }
}

</style>