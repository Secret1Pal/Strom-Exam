<script setup>
import { onMounted } from 'vue';

const data = [
  { received: "2022-11-03T11:44:58.382Z" },
  { received: "2022-01-30T11:49:13.740Z" },
  { received: "2022-06-02T11:48:34.711Z" }
];

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-GB', options);
}

data.forEach(item => {
  item.received = formatDate(item.received);
});

onMounted(()=>{

    const cutText = document.querySelectorAll("#cutText")
    let charLimit = 100
    cutText.forEach((cutText)=>{
        const fullText = cutText.textContent

        if (fullText.length > charLimit) {
            let newText = fullText.slice(0, charLimit)
            let lastSpace = newText.lastIndexOf(" ")
            if (lastSpace !== -1) {
                newText = newText.slice(0, lastSpace) // Trim to the last whole word
            }
            cutText.textContent = newText + "..."
        }
    })
})

</script>
<template>

<div class="container">
    <div class="content">
        <h3>Sidste <span>nyt</span></h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusm tempor incididunt</p>
        <div class="line"></div>
    </div>
    <div class="card-container">
        <div class="card">
            <div class="date">{{ data[0].received }}</div>
            <figure>
                <RouterLink to="/about">
                    <img v-lazy data-src="/images/news/1.jpg" alt="">
                </RouterLink>
            </figure>
            <div class="title">Få tjekket din varmepumpe</div>
            <p id="cutText">Lorem ipsum dolor amet consectetur adipiciciing elit sed eiusm tempor incididunt ut labore dolore magna aliqua enim ad minim</p>
        </div>
        <div class="card">
            <div class="date">{{ data[1].received }}</div>
            <figure>
                <RouterLink to="/about">
                    <img v-lazy data-src="/images/news/2.jpg" alt="">
                </RouterLink>
            </figure>
            <div class="title">Få tjekket din varmepumpe</div>
            <p id="cutText">Lorem ipsum dolor amet consectetur adipiciciing elit sed eiusm tempor incididunt ut labore dolore magna aliqua enim ad minim</p>
        </div>
        <div class="card">
            <div class="date">{{ data[2].received }}</div>
            <figure>
                <RouterLink to="/about">
                    <img v-lazy data-src="/images/news/3.jpg" alt="">
                </RouterLink>
            </figure>
            <div class="title">Få tjekket din varmepumpe</div>
            <p id="cutText">Lorem ipsum dolor amet consectetur adipiciciing elit sed eiusm tempor incididunt ut labore dolore magna aliqua enim ad minim</p>
        </div>
    </div>
    <RouterLink to="/about" class="link">Flere nyheder</RouterLink>
</div>
</template>

<style lang="scss" scoped>

.container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    padding: 70px 0;

    
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

.card-container{
    max-width: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap row;
    gap: 20px;

    .card{
        width: 280px;
        min-height: 200px;
        overflow: hidden;
        box-shadow: 0 0 10px #2222225d;
        border-radius: 6px;
        position: relative;
        transition: .3s ease;

        .date{
            position: absolute;
            background-color: #ff6600;
            left: 15px;
            top: 15px;
            color: #f8f8fa;
            font-size: 16px;
            width: 30px;
            text-align: center;
            padding: 5px;
            border-top-left-radius: 7px;
            border-top-right-radius: 7px;
            z-index: 100;

            &::after{
                content: "";
                position: absolute;
                bottom: -12px;
                left: 0;
                width: 0;
                height: 0;
                border-right: 20px solid transparent;
                border-top: 12px solid #ff6600;
            }

            &::before{
                content: "";
                position: absolute;
                bottom: -12px;
                right: 0;
                width: 0;
                height: 0;
                border-left: 20px solid transparent;
                border-top: 12px solid #ff6600;
            }
        }

        figure{
            width: 100%;
            height: 200px;
            overflow: hidden;
            img{
                &:hover{
                    scale: 1.1;
                }
            }
        }

        .title{
            margin: 15px 0 0 10px;
            font-size: 18px;
            font-weight: bold;
        }

        p{
            margin: 10px 10px;
            font-size: 16px;
            color: #676a73;
            line-height: 22px;
        }

        &:hover{
            box-shadow: 0 0 10px #222222d7;
        }

    }
}

.link{
        width: 180px;
        height: 40px;
        text-transform: uppercase;
        font-size: 16px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 3px solid #ff6600;
        display: flex;
        margin: 40px 0 0 0;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        transition: .2s ease-in;
        
        &:hover{
            background-color: transparent;
            color: #ff6600;
        }
    }

</style>