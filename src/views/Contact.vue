<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';

const handleSubmit = (event) =>{
    const fd = new FormData(event.target)
    for(const [key, value] of fd){
        console.log(`${key}: ${value}`)
    }
}

</script>

<template>
<Breadcrumb title="Kontakt os" nav="Kontakt os"/>

<div class="info-container">
    <div class="info">
        <v-icon name="fa-map-marker-alt" fill="#ff6600"/>
        <div>
            <div class="title">Adresse</div>
            <div class="text">Strømparken 1, 8500 Grenaa.</div>
        </div>
    </div>
    <div class="info">
        <v-icon name="fa-phone-alt" fill="#ff6600"/>
        <div>
            <div class="title">Telefon</div>
            <div class="text">[45] 86 45 45 78</div>
        </div>
    </div>
    <div class="info">
        <v-icon name="fa-mail-bulk" fill="#ff6600"/>
        <div>
            <div class="title">Email</div>
            <div class="text">info@stroem.dk</div>
        </div>
    </div>
</div>

<div class="contact-container">
    <div class="content">
        <div class="title">Kontakt os</div>
        <div class="text">Lorem ipsum dolor amet consectetur adipicicing elit sed eiusm tempor incididunt ut labore dolore magna aliqua enim ad minim.</div>
        <form v-on:submit.prevent="handleSubmit">
            <div class="input-container flex">
                <div class="input-container">
                    <input type="text" name="name" placeholder="Dit navn" required>
                    <input type="email" name="email" placeholder="Din email" required>
                    <input type="tel" name="phone" placeholder="Telefon nr." required>
                </div>
                <textarea name="mmessage" placeholder="Din besked..." required></textarea>
            </div>
            <button type="submit">Send besked</button>
        </form>
    </div>
    <figure class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1715.7089425476101!2d10.875646486478498!3d56.40671719325872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464dd5b11ea53dcf%3A0xd84e314868425f52!2s3d%20College!5e0!3m2!1sen!2sdk!4v1730468062118!5m2!1sen!2sdk" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </figure>
</div>

</template>

<style lang="scss" scoped>

.info-container{
    max-width: 900px;
    min-height: 100px;
    margin: 70px auto;
    box-sizing: border-box;
    border: 2px solid #e5e5e5;
    border-radius: 7px;
    display: flex;
    align-items: center;
    flex-flow: row wrap;

    .info{
        width: 33%;
        height: 70px;
        box-sizing: border-box;
        padding: 0 0 0 30px;
        display: flex;
        align-items: center;
        border-right: 2px solid #e5e5e5;

        &:last-child{
            border-right: 0;
        }

        svg{
            scale: 1.4;
            transform: translate(-7px, -7px);
        }

        .title{
            font-size: 18px;
        }

        .text{
            margin: 5px 0 0 0;
            color: #676a73;
        }

        @media screen and (max-width: 666px) {
            width: 100%;
            border: 0;
        }
    }
}

.contact-container{
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 10px 80px 10px;
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    .content{
        width: 400px;
        flex: 0.9;
        .title{
            font-size: 26px;
        }
        .text{
            color: #676a73;
            line-height: 24px;
        }
        form{
            .input-container{
                flex: 1;
                width: auto;
                height: auto;
            }
            .flex{
                display: flex;
            }
            input,textarea{
                box-sizing: border-box;
                outline: none;
                border: 2px solid #e5e5e5;
                background-color: #f8f8fa;
                border-radius: 3px;
                transition: .2s ease;

                &:focus{
                    border: 2px solid #222;
                }
            }
            input{
                width: 250px;
                margin: 20px 20px 0 0;
                padding: 10px;
            }
            textarea{
                min-height: 160px;
                width: 100%;
                padding: 10px;
                margin: 20px 0;
                resize: vertical;
                font-family: Arial, Helvetica, sans-serif;
            }
            button{
                background-color: #ff6600;
                border: 2px solid #ff6600;
                color: #f8f8fa;
                padding: 10px 20px;
                text-transform: uppercase;
                border-radius: 3px;
                transition: .2s ease-in;

                &:hover{
                    background-color: #f8f8fa;
                    color: #ff6600;
                    cursor: pointer;
                }
            }
            @media screen and (max-width: 930px) {
                .flex{
                    display: block;
                }
                input{
                    width: 100%;
                    margin: 20px 0 0 0;
                }
            }
        }

        @media screen and (max-width: 930px) {
            width: 70%;
        }
        @media screen and (max-width: 520px) {
            width: 100%;
        }
    }

    .map{
        height: 350px;
        width: 300px;
        border: 2px solid #e5e5e5;
        border-radius: 4px;
        iframe{
            width: 100%;
            height: 100%;
        }
        @media screen and (max-width: 930px) {
            margin: 70px 0 0 0;
            width: 500px;
        }
        @media screen and (max-width: 520px) {
            width: 100%;
        }
    }

    @media screen and (max-width: 930px) {
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
}

</style>
