<template>

<div class="container">
    <div class="content">
        <div class="services">
            <h3>Vores <span style='color: #ff6600; font-weight: bold;'>services</span></h3>
            <p>Lorems ipsum dolor sit amet, consectetur adipiscing elit sed do eiusm tempor</p>
            <div class="line"></div>
            <div class="service-box">
                <div class="service">
                    <i class="fi flaticon-lamp"></i>
                    <div class="text">
                        <div class="title">Strøm</div>
                        <p>Lorem ipsum dolor sit amet constur adip isicg elit sed do eiusmtempor incid dolore magna.</p>
                    </div>
                </div>
                <div class="service">
                    <i class="fi flaticon-technology"></i>
                    <div class="text">
                        <div class="title">Sikkerhed</div>
                        <p>Lorem ipsum dolor sit amet constur adip isicg elit sed do eiusmtempor incid dolore magna.</p>
                    </div>
                </div>
                <div class="service">
                    <i class="fi flaticon-fan"></i>
                    <div class="text">
                        <div class="title">Air Conditioning</div>
                        <p>Lorem ipsum dolor sit amet constur adip isicg elit sed do eiusmtempor incid dolore magna.</p>
                    </div>
                </div>
                <div class="service">
                    <i class="fi flaticon-air-conditioner-1"></i>
                    <div class="text">
                        <div class="title">Varme</div>
                        <p>Lorem ipsum dolor sit amet constur adip isicg elit sed do eiusmtempor incid dolore magna.</p>
                    </div>
                </div>
            </div>
        </div>
        <figure class="img-container">
            <img v-lazy data-src="/images/service.png" alt="Image of a lady worker">
        </figure>
    </div>
</div>

</template>

<style lang="scss" scoped>

.container{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 70px 0 0 0;
}

.content{
    width: 900px;
    display: flex;
    justify-content: space-between;
    

    .services{
        flex: 2.5;
        .service-box{
            margin: 30px 0 50px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-flow: row wrap;

            .service{
                margin: 40px 0 0 0px;
                display: flex;
                width: calc(50% - 10px);

                i{
                    color: #ff6600;
                    font-size: 38px;
                    scale: 1.2;
                }

                .text{
                    margin: 0 0 0 20px;

                    .title{
                        margin: 0 0 10px 0;
                        font-size: 22px;
                        color: #222;
                    }

                    p{
                        line-height: 24px;
                        font-size: 14px;
                    }
                }
            }
        }

        h3{
        color: #222;
        font-size: calc(20px + 1.5vmin);
        font-weight: bold;
        }
        p{
            max-width: 900px;
            line-height: 20px;
            color: #676a73;
        }
        .line{
            margin: 20px 0 0 0;
            height: 2px;
            width: 100px;
            background-color: #e5e5e5;
            position: relative;
            &::after{
                content: "";
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: #ff6600;
                border-radius: 50%;
                top: 1px;
                left: 4px;
                transform: translate(-50%, -50%);
                z-index: 8;
            }
            &::before{
                content: "";
                position: absolute;
                width: 6px;
                height: 6px;
                background-color: #f8f8fa;
                border-radius: 50%;
                top: 1px;
                left: 4px;
                transform: translate(-50%, -50%);
                z-index: 9;
            }
        }
    }

    .img-container{
        flex: 1;
        translate: 50px;
        img{
            overflow:visible;
        }
    }

    @media screen and (max-width: 1160px) {
        width: 100%;
        padding: 0 10px;

        .img-container{
            translate: 0px;
            flex: 2;
        }
    }

    @media screen and (max-width: 930px) {
        flex-flow: column nowrap;
        
        .services{
            .service-box{
                .service{
                    width: calc(100% - 10px);
                }
            }
        }

        .img-container{
            display: none;
        }
    }

    @media screen and (max-width: 550px) {
        .img-container{
            display: block;
        }
    }
}

</style>