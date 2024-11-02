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
        left: 20px;
        top: 20px;
        padding: 15px 30px;
        border-radius: 100px;
        box-shadow: 0 0 15px #222222b2;

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
        background: transparent;
        pointer-events: none;
    }

    @keyframes let {
        50% {transform: translateY(-10px)}
    }
</style>