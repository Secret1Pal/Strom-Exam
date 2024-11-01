<template>

<div class="container">
    <h3>Skal du bruge <span style='color: #ff6600;'>hjælp</span> fra <span style='color: #ff6600;'>Strøm?</span></h3>
    <p>Lorems ipsum dolor sit amet, consectetur</p>
    <RouterLink to="/contact">Kontakt os</RouterLink>
</div>

</template>

<style scoped lang="scss">

.container{
    width: 100%;
    height: 250px;
    background-color: #343742;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;

    h3{
        color: #f8f8fa;
        font-size: calc(20px + 2vmin);
        text-align: center;
    }

    p{
        font-size: 16px;
        width: 100%;
        text-align: center;
        color: #d4dae3;
        margin: 2vmin 0 0 0;
    }

    a{
        width: 150px;
        height: 40px;
        text-transform: uppercase;
        font-size: 16px;
        color: #f8f8fa;
        text-decoration: none;
        background-color: #ff6600;
        border: 3px solid #ff6600;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 0 0;
        border-radius: 4px;
        transition: .2s ease-in;
        
        &:hover{
            background-color: transparent;
            color: #ff6600;
        }
    }
}

</style>