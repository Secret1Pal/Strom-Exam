<template>
    <dialog ref="loaderDialog" class="loader">
        <span class="let">L</span><span class="let">o</span><span class="let">a</span>
        <span class="let">d</span><span class="let">i</span><span class="let">n</span>
        <span class="let">g</span><span class="let">.</span><span class="let">.</span>
        <span class="let">.</span>
    </dialog>
</template>
  
<script setup>
    import { onMounted, ref } from 'vue';
    
    // Reference to the dialog element
    const loaderDialog = ref(null);
    
    // Show the dialog when the component is mounted
    onMounted(() => {
        loaderDialog.value.showModal();
    });
</script>
  
<style lang="scss" scoped>
    $loaderNum: 10;

    .loader{
        font-family: monospace, arial;
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
        background-color: transparent;
        inset: 50%;
        transform: translate(-50%, -50%);
        overflow:visible;
        background-color: #ffffffd9;
        border-radius: 10px;
        padding: 15px 30px;

        .let{
            animation: let 1s ease infinite;
            
            @for $i from 1 through $loaderNum {
                &:nth-child(#{$i}){
                    animation-delay: calc(0.05s * #{$i});
                }
            }
        }
    }

    dialog::backdrop{
        background: #ffffff20;
        backdrop-filter: blur(5px);
    }

    @keyframes let {
        50% {transform: translateY(-10px)}
    }
</style>