<script setup>
import { ref } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading} = useRequestData()

const check = ref("")

const handleSubmit = async(event) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fd = new FormData(event.target)
    for(const [key, value] of fd){
        if(key == "email"){
            if(emailRegex.test(value)){
                check.value = "Booking Submitted!"
            } else {
                check.value = "Invalid email"
                return
            }
        }
    }
    await makeRequest("http://127.0.0.1:5333/booking", "POST", fd)
}

</script>

<template>
<Loader v-if="isLoading"/>
<div class="container">
    <div class="content">
        <div><span style="color: #ff6600;">Book</span><br> service nu</div>
        <form v-on:submit.prevent="handleSubmit">
            <input type="text" name="name" placeholder="Dit navn" required>
            <input type="email" name="email" placeholder="Din Email" required>
            <input type="tel" name="phone" placeholder="Telefon nr." required>
            <button type="submit">Send</button>
        </form>
        <div class="error" v-if="check">{{check}}</div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    height: auto;
    padding: 10px;
    box-shadow: 0 0 10px #22222273;
    display: flex;
    justify-content: center;

    .content{
        width: 900px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row wrap;

        div{
            font-size: 24px;
        }

        form{
            input{
                width: 170px;
                height: 20px;
                padding: 10px;
                margin: 10px 10px 10px 0;
                border-radius: 4px;
                transition: .2s ease;
                border: 1px solid #e5e5e5;
                background-color: #f8f8fa;
                color: #222;

                &::placeholder{
                    color: #222;
                }
                &:focus{
                    outline: none;
                    border: 1px solid #777;
                }
            }

            button{
                background-color: #ff6600;
                border: none;
                color: #f8f8fa;
                text-transform: uppercase;
                padding: 10px;
                width: 80px;
                border: 2px solid #ff6600;
                border-radius: 4px;
                transition: .2s ease-in;

                &:hover{
                    background-color: #f8f8fa;
                    color: #ff6600;
                    cursor: pointer;
                }
            }
        }

        .error{
            font-size: 18px;
            text-align: center;
            width: 100%;
            color: #d9534f;
        }
    }
}

</style>