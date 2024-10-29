<template>
    <header class="header">
        <div class="content">
            <figure>
                <img src="/images/logo.png" alt="STRØM logo">
            </figure>
            <ol>
                <li><v-icon name="fa-map-marker-alt" scale="0.7" fill="#ff6600"/>Strømparken 1, 8500 Grenaa</li>
                <li><v-icon name="fa-regular-clock" scale="0.7" fill="#ff6600"/>Man - fre 9.00 - 18.00</li>
                <li><v-icon name="fa-phone-alt" scale="0.7" fill="#ff6600"/>(+45) 86 45 45 78</li>
            </ol>
        </div>
    </header>
</template>

<style lang="scss" scoped>

.header{
    width: 100%;
    padding: 10px 0 50px 0;
    background-color: #343742;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.content{
    width: 900px;
    // background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e5e5e5;

    @media only screen and (max-width: 665px) {
        flex-flow: column;
    }

    figure{
        height: 100%;
    }

    ol{
        list-style-type: none;
        display: flex;
        font-size: 12px;

        li{
            margin: 0 0 0 20px;

            svg{
                margin: 0 5px 0 0;
            }

            &:last-child{
                margin: 0 5px 0 20px;
            }
        }

        @media only screen and (max-width: 650px) {
            flex-flow: column;
            align-items: center;

            li{
                margin: 15px 0 0 0;

                &:last-child{
                    margin: 15px 0 0 0;
                }
            }
        }
    }
}

</style>