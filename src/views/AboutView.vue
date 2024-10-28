<script setup>
import {ref} from "vue"
import ImageUploader from '@/components/imageUploader.vue';

const imageData = ref([])

const checkData = async () => {
  const formData = new FormData();

  if(!imageData.value || imageData.value.length === 0){
    alert("Choose Images before creating")
    return
  }

  imageData.value.forEach(file => {
    formData.append("images[]", file); // Use the correct key name
  });

  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`)
  }
};


const emptyData = () =>{
  imageData.value = []
  console.log("Cleared")
}

</script>

<template>
  <h1>About Page</h1>
  <RouterLink to="/">Home</RouterLink>

  <ImageUploader :image-files="imageData" :empty-files="emptyData"/>

</template>

<style lang="scss" scoped>



</style>
