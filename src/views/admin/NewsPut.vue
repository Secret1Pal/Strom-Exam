<script setup>
import AdminBreadcrumb from '@/components/AdminBreadcrumb.vue';
import ImageUploader from '@/components/ImageUploader.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { inject, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const { userState, login, logout } = inject("user");
if (!userState.isLoggedIn) {
  router.push("/");
}

const route = useRoute()
const id = ref(route.params.id)

const emptyData = () =>{
  imageData.value = []
  console.log("Cleared")
}

const quillRef = ref(null)
const imageData = ref([])
const titleRef = ref(null)

const handleSubmit = (event) =>{
    const imageString = imageData.value.toString()
    if(!imageString){
        alert("Image required")
        return
    }
    if(quillRef.value.getHTML() == "<p><br></p>"){
        alert("Content required")
        return
    }

    const fd = new FormData(event.target)
    
    fd.append("content", quillRef.value.getHTML())
    fd.append("image", imageString)
    
    for(const [key, value] of fd){
        console.log(`${key}: ${value}`)
    }
}

onMounted(()=>{
    
})

</script>
<template>
<h1 v-if="!userState.isLoggedIn">Access Denied</h1>
<template v-else>
    <AdminBreadcrumb middle-nav="News" middle-route="admin/news" title="News Edit" nav="PUT"/>
    <form class="form" v-on:submit.prevent="handleSubmit">

        <label for="title">Title</label>
        <input ref="titleRef" id="title" name="title" type="text" placeholder="Title for News" required>
        <label for="teaser">Content</label>
        <QuillEditor ref="quillRef" toolbar="minimal"/>
        <label for="image">Image</label>
        <ImageUploader :max-images="1" for-id="image" :empty-files="emptyData" :initial-images="['/images/1.jpg']" :image-files="imageData"/>
        <button type="submit">Submit</button>

    </form>
</template>
</template>

<style lang="scss" scoped>

.form{
    max-width: 900px;
    margin: 50px auto;
    padding: 0 10px;
    box-sizing: border-box;

    label{
        margin: 30px 0 0 0;
        display: block;
        font-size: 24px;
    }

    input,textarea{
        box-sizing: border-box;
        outline: none;
        border: 2px solid #e5e5e5;
        background-color: #f8f8fa;
        border-radius: 3px;
        transition: .2s ease;

        &:focus{
            border: 2px solid #222;
        }
    }
    input{
        width: 300px;
        padding: 10px;
    }
    textarea{
        min-height: 200px;
        width: 100%;
        padding: 10px;
        resize: vertical;
        font-family: Arial, Helvetica, sans-serif;
    }
    button{
        margin: 30px 0;
        background-color: #ff6600;
        border: 2px solid #ff6600;
        color: #f8f8fa;
        padding: 10px 30px;
        text-transform: uppercase;
        border-radius: 3px;
        transition: .2s ease-in;
        font-size: 18px;

        &:hover{
            background-color: #f8f8fa;
            color: #ff6600;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 930px) {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
    }
}

</style>