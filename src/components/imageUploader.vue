<script setup>
import { ref, onMounted } from 'vue';

/* The setup for it when imported

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

*/

const props = defineProps({
  maxImages: {
    type: Number,
    required: false,
    default: 3
  },
  forId: {
    type: String,
    required: false,
    default: "imageUploader"
  },
  imageFiles: {
    type: Array,
    required: true,
    default: () => []
  },
  emptyFiles: {
    type: Function,
    required: true
  },
  initialImages: {
    type: Array,
    required: false,
    default: () => []
  }
});

const imageUrls = ref([])

onMounted(()=>{
  if(props.initialImages.length === 0){
    return
  }
  props.initialImages.forEach(file=>{
    fetch(file)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageUrls.value.push(e.target.result)
      };
      reader.readAsDataURL(blob)
      props.imageFiles.push(blob)
    })
    .catch(error => console.error('Error fetching the image:', error));
  })
})

const readFiles = (event) =>{
    const files = Array.from(event.target.files);

    if (imageUrls.value.length + files.length > props.maxImages) {
        alert(`You can only add up to ${props.maxImages} images.`);
        return;
    }

    files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            imageUrls.value.push(e.target.result)
        }
        reader.readAsDataURL(file)
        props.imageFiles.push(file)
    });

    event.target.value = ""
}

const removeImage = (index) =>{
    imageUrls.value.splice(index, 1)
    props.imageFiles.splice(index, 1)
}

const clearImages = () =>{
    imageUrls.value = []
    props.emptyFiles()
}

</script>

<template>
    <div class="file-uploader">
        <label class="file-label">
            <input type="file" accept="image/*" @change="readFiles" multiple class="file-input" :id="forId"/>
            Choose Images
        </label>
        <div class="image-container">
            <div v-for="(image, index) in imageUrls" :key="index" class="image-wrapper">
                <img :src="image" alt="Selected Image" class="uploaded-image" @click="removeImage(index)" />
            </div>
        </div>
        <div class="button-group">
            <button type="button" @click="clearImages()" class="clear-button">Clear</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.file-uploader {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  background-color: #f9f9f9;
}

.file-label {
  display: inline-block;
  padding: 10px 15px;
  margin: 10px 0;
  background-color: #ff6600;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.1s;
}

.file-label:hover {
  background-color: #c75000;
}

.file-input {
  display: none;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 100%;
}

.image-wrapper {
  max-width: 100px;
  position: relative;
}

.uploaded-image {
  max-width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.3s;
}

.uploaded-image:hover {
  transform: scale(1.05);
}

.button-group {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.clear-button {
  padding: 5px 15px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: rgb(240, 0, 0);
  color: #fff;
}

.clear-button:hover {
  background-color: #850000;
}


</style>