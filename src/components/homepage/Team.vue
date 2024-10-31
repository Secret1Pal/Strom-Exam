<template>

<div class="container">
    <div class="content">
        <h3>Vores <span>team</span></h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm tempor</p>
        <div class="line"></div>
    </div>
    <div class="team">
        <div class="person">
            <div class="bg-element"></div>
            <img v-lazy data-src="/images/team/1.png" alt="">
            <div class="accordian">
                <div class="name">Mads Jull</div>
                <div class="title">Elektriker</div>
                <div class="some">
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-facebook-f" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-twitter" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-linkedin-in" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-pinterest-p" fill="#f8f8fa"/></a>
                </div>
            </div>
        </div>
        <div class="person">
            <div class="bg-element"></div>
            <img v-lazy data-src="/images/team/2.png" alt="">
            <div class="accordian">
                <div class="name">Mads Jull</div>
                <div class="title">Elektriker</div>
                <div class="some">
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-facebook-f" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-twitter" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-linkedin-in" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-pinterest-p" fill="#f8f8fa"/></a>
                </div>
            </div>
        </div>
        <div class="person">
            <div class="bg-element"></div>
            <img v-lazy data-src="/images/team/3.png" alt="">
            <div class="accordian">
                <div class="name">Mads Jull</div>
                <div class="title">Elektriker</div>
                <div class="some">
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-facebook-f" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-twitter" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-linkedin-in" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-pinterest-p" fill="#f8f8fa"/></a>
                </div>
            </div>
        </div>
        <div class="person">
            <div class="bg-element"></div>
            <img v-lazy data-src="/images/team/4.png" alt="">
            <div class="accordian">
                <div class="name">Mads Jull</div>
                <div class="title">Elektriker</div>
                <div class="some">
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-facebook-f" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-twitter" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-linkedin-in" fill="#f8f8fa"/></a>
                    <a href="https://theuselessweb.com" target="_blank"><v-icon name="fa-pinterest-p" fill="#f8f8fa"/></a>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    padding: 50px 0 40px 0;
}

.content{
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        margin: 10px 0 0 0;
        font-size: calc(20px + 2vmin);
        font-weight: bold;

        span{
            color: #ff6600;
            font-weight: bold;
        }
    }

    p{
        font-size: 16px;
        width: 95%;
        text-align: center;
        color: #676a73;
        margin: 10px 0;
    }

    .line{
            margin: 10px 0 0 0;
            height: 2px;
            width: 50px;
            translate: -35px;
            background-color: #d4dae3;
            position: relative;

            &::after{
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
            &::before{
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

.team{
    max-width: 900px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.person{
    width: calc(25% - 20px);
    position: relative;
    overflow: hidden;

    .bg-element{
        position: absolute;
        background-color: #e5e5e5;
        width: 100%;
        height: 100px;
        z-index: -1;
        bottom: 0;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        
        &::after{
            content: "";
            position: absolute;
            top: -15px;
            left: 0;
            width: 0;
            height: 0;
            border-right: 100px solid transparent;
            border-bottom: 15px solid #e5e5e5;
        }

        &::before{
            content: "";
            position: absolute;
            top: -30px;
            right: 0;
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-bottom: 30px solid #e5e5e5;
        }
    }

    .accordian{
        background-color: #ff6600;
        color: #f8f8fa;
        position: absolute;
        bottom: -50%;
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-flow: column nowrap;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        transition: .3s ease-in-out;

        .name{
            font-size: 20px;
        }

        .title{
            font-size: 16px;
        }

        .some{
            display: flex;
            justify-content: space-evenly;
            width: 100%;
        }

        &::after{
            content: "";
            position: absolute;
            top: -30px;
            left: 0;
            width: 0;
            height: 0;
            border-right: 100px solid transparent;
            border-bottom: 30px solid #ff6600;
        }

        &::before{
            content: "";
            position: absolute;
            top: -15px;
            right: 0;
            width: 0;
            height: 0;
            border-left: 100px solid transparent;
            border-bottom: 15px solid #ff6600;
        }
    }

    &:hover{
        .accordian{
            bottom: 0;
        }
    }

    @media screen and (max-width: 930px) {
        width: 200px;
    }

    @media screen and (max-width: 400px) {
        width: 90%;

        .bg-element{
            height: 140px;
        }

        .accordian{
            height: 140px;
            
            .name{
                font-size: 28px;
            }

            .title{
                font-size: 20px;
            }

            .some{
                svg{
                    scale: 1.5;
                }
            }
        }
    }
}

</style>