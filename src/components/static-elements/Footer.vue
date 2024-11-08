<script setup>
import { inject, onMounted, ref } from 'vue';
import useRequestData from '@/hook/useRequestData';
import Loader from '@/assets/Loader.vue';

const {data, makeRequest, isLoading, error} = useRequestData()
const {data: postData, makeRequest: postRequest, isLoading: postIsLoading, error: postError} = useRequestData()

const check = ref("")

async function loadData(){
    await makeRequest("http://127.0.0.1:5333/contactinformation")
}

const handleSubmit = async(event) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const fd = new FormData(event.target)
    await postRequest("http://127.0.0.1:5333/newssubscription", "POST", fd)
    for(const [key, value] of fd){
        if(emailRegex.test(value) && !postError.value){
            check.value = "Email Submitted!"
        } else if(postError.value){
            check.value = "Email in use"
        } else {
            check.value = "Invalid email"
        }
    }
}

const { userState, login, logout } = inject("user");

onMounted(()=>{
    loadData()
})

</script>

<template>
<footer class="footer">
    <Loader v-if="isLoading || postIsLoading"/>
    <RouterLink v-if="!userState.isLoggedIn" class="administrative_link" to="/login">Login...</RouterLink>
    <RouterLink v-else class="administrative_link" to="/admin/home">Return to Admin</RouterLink>
    <div class="main-content">
        <figure>
            <img v-lazy data-src="/images/logo.png" src="/images/logo.png" alt="STRØM logo">
            <figcaption>Som medlem af Elinstallatørernes Landsorganisation, ELFO, er vi tilsluttet et ankernævn og en garantiordning</figcaption>
        </figure>
        <div class="link">
            <h4>Link</h4>
            <ol>
                <li><v-icon name="fa-angle-right" fill="#d4dae3"/><RouterLink to="/faq">FAQ</RouterLink></li>
                <li><v-icon name="fa-angle-right" fill="#d4dae3"/><RouterLink to="/about">Om os</RouterLink></li>
                <li><v-icon name="fa-angle-right" fill="#d4dae3"/><RouterLink to="/contact">Kontakt os</RouterLink></li>
                <li><v-icon name="fa-angle-right" fill="#d4dae3"/><RouterLink to="/service">Services</RouterLink></li>
            </ol>
        </div>
        <div class="contact">
            <h4>Kontakt os</h4>
            <ol>
                <li><span>Adresse</span>: {{ data?.address }}, {{ data?.zipcity }}</li>
                <li><span>Telefon</span>: {{ data?.phone }}</li>
                <li><span>Email</span>: {{ data?.email }}</li>
            </ol>
        </div>
        <div class="news">
            <h4>Nyhedsbrev</h4>
            <p>Tilmeld dig vores nyhedsbrev her</p>
            <form v-on:submit.prevent="handleSubmit">
                <input type="email" name="email" required placeholder="Din Email">
                <div class="check">{{ check }}</div>
                <button type="submit">Tilmeld</button>
            </form>
        </div>
    </div>
    <hr class="line">
    <div class="sub-content">
        <p><span>Strøm</span> &copy; 2017 All Rights Reserved</p>
        <div>
            <a href="https://www.google.co.uk" target="_blank">
                <v-icon label="Facebook">
                    <v-icon name="fa-facebook" fill="#f8f8fa"/>
                    <v-icon name="fa-regular-circle" scale="2" fill="#f8f8fa"/>
                </v-icon>
            </a>
            <a href="https://www.google.co.uk" target="_blank">
                <v-icon label="Twitter">
                    <v-icon name="fa-twitter" fill="#f8f8fa"/>
                    <v-icon name="fa-regular-circle" scale="2" fill="#f8f8fa"/>
                </v-icon>
            </a>
            <a href="https://www.google.co.uk" target="_blank">
                <v-icon label="Vimeo">
                    <v-icon name="fa-vimeo" fill="#f8f8fa"/>
                    <v-icon name="fa-regular-circle" scale="2" fill="#f8f8fa"/>
                </v-icon>
            </a>
            <a href="https://www.google.co.uk" target="_blank">
                <v-icon label="Linkedin">
                    <v-icon name="fa-linkedin" fill="#f8f8fa"/>
                    <v-icon name="fa-regular-circle" scale="2" fill="#f8f8fa"/>
                </v-icon>
            </a>
        </div>
    </div>
</footer>
</template>

<style lang="scss" scoped>

.administrative_link{
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 5px;
    color: #777;
    text-decoration: none;
    transition: .2s ease-in;

    &:hover{
        color: #e5e5e5;
    }
}

.footer{
    position: relative;
    background-color: #343742;
    height: 400px;
    width: 100%;
    display: flex;
    flex-flow: nowrap column;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 920px) {
        height: auto;
    }
}

.main-content{
    display: flex;
    justify-content: space-between;
    width: 900px;
    height: 250px;
    padding: 70px 0 0 0;

    figure{
        width: 245px;
        
        img{
            height: 55px;
            width: 140px;
        }
        figcaption{
            margin: 10px 0 0 0;
            color: #d4dae3;
            line-height: 30px;
            font-size: 14px;
        }
    }

    div{

        h4{
            margin: 20px 0 0 0;
            font-size: 18px;
            color: #f8f8fa;
        }

        ol{
            list-style-type: none;
        }
    }

    .link{
        ol{
            li{
                margin: 20px 0 0 0;
                a{
                    text-decoration: none;
                    color: #d4dae3;
                    transition: .2s ease-in;
                    font-size: 14px;

                    &:hover{
                        color: #ff6600;
                    }
                }
            }
        }
    }

    .contact{
        ol{
            li{
                margin: 20px 0 0 0;
                text-decoration: none;
                color: #d4dae3;
                font-size: 14px;
            }
            span{
                font-weight: bold;
            }
        }
    }

    .news{
        p{
            margin: 20px 0 0 0;
            color: #d4dae3;
            font-size: 14px;
        }

        form{
            margin: 20px 0 0 0;
            display: flex;
            flex-flow: column nowrap;

            .check{
                margin: 5px 0;
                color: #e5e5e5;
            }

            input{
                border: 2px solid #474b5a;
                outline: none;
                padding: 15px;
                border-radius: 5px;
                background-color: #474b5a;
                color: #f8f8fa;
                &::placeholder{
                    color: #222;
                }
                &:focus{
                    border: 2px solid #676a73;
                }
            }

            button{
                margin: 20px 0 0 0;
                text-transform: uppercase;
                border: none;
                background-color: #ff6600;
                border: 3px solid #ff6600;
                border-radius: 7px;
                color: #f8f8fa;
                width: 120px;
                height: 50px;
                transition: .3s ease;
                
                &:hover{
                    cursor: pointer;
                    background-color: #ff660050;
                }
            }
        }
    }

    @media screen and (max-width: 920px) {
        width: 100%;
        flex-flow: column nowrap;
        height: auto;
        padding: 70px 0 0 20px;
        box-sizing: border-box;

        figure{
            width: 90%;
        }

        .link{
            ol{
                li{
                    margin: 10px 0 0 0;
                }
            }
        }

        .contact{
            ol{
                li{
                    margin: 10px 0 0 0;
                }
            }
        }

        .news{
            margin: 0 0 30px 0;
            p{
                margin: 10px 0 0 0;
            }

            form{
                margin: 10px 0 0 0;

                input{
                    width: 80%;
                }
            }
        }
    }
}

.line{
    width: 100%;
    border: none;
    border-top: 2px solid #474b5a;
}

.sub-content{
    height: 50px;
    width: 900px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    color: #f8f8fa;

    span{
        color: #ff6600;
        margin: 0 0 0 5px;
    }

    svg{
        margin: 0 0 0 10px;
        border-radius: 50%;
        transition: .2s ease-in;
    }

    a:hover{
        svg{
            background-color: #f8f8fa;
            fill: #ff6600;
        }
    }

    @media screen and (max-width: 920px) {
        width: 100%;
    }

    @media screen and (max-width: 450px) {
        flex-flow: column nowrap;
        height: auto;

        svg{
            margin: 20px 0 10px 30px;
        }
    }
}

</style>