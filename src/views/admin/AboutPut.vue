<script setup>
import AdminBreadcrumb from '@/components/AdminBreadcrumb.vue';
import ImageUploader from '@/components/ImageUploader.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from '@/assets/Loader.vue';
import useRequestData from '@/hook/useRequestData';

const router = useRouter();
const { userState, login, logout } = inject("user");
if (!userState.isLoggedIn) {
  router.push("/");
}

const {data: editData, makeRequest: editRequest, isLoading: editLoading, error: editError} = useRequestData()
const {data, makeRequest, isLoading, error} = useRequestData()

const quillRef = ref(null)
const imageData = ref([])
const titleRef = ref(null)
const teaserRef = ref(null)

const loadData = async() =>{
    await makeRequest("http://127.0.0.1:5333/about")
    quillRef.value.setHTML(data.value?.content)
    titleRef.value.value = data.value?.title
    teaserRef.value.value = data.value?.teaser
    console.log(data.value.image)
}

const emptyData = () =>{
  imageData.value = []
  console.log("Cleared")
}

const handleSubmit = async(event) =>{
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
    
    await editRequest("http://127.0.0.1:5333/about/admin", "PUT", fd)
    if(editData.value){
        alert("Successfully edited!")
        console.log(editData.value)
    } else {
        alert("Didn't edit!")
    }
    
}

onMounted(()=>{
    loadData()
})

</script>
<template>
<h1 v-if="!userState.isLoggedIn">Access Denied</h1>
<template v-else>
    <Loader v-if="isLoading" />
    <AdminBreadcrumb title="About Edit" nav="About"/>
    <form class="form" v-on:submit.prevent="handleSubmit">
        <label for="title">Title</label>
        <input ref="titleRef" id="title" name="title" type="text" placeholder="Title for About" required>
        <label for="teaser">Teaser</label>
        <textarea name="teaser" ref="teaserRef" id="teaser" placeholder="Teaser for About" required></textarea>
        <label for="teaser">Content</label>
        <QuillEditor ref="quillRef" toolbar="minimal"/>
        <label for="image">Image</label>
        <ImageUploader :max-images="1" for-id="image" :empty-files="emptyData" :initial-images="[`http://localhost:5333/images/about/1647624819938.webp`]" :image-files="imageData"/>
        <!--<ImageUploader :max-images="1" for-id="image" :empty-files="emptyData" :initial-images="[`http://localhost:5333/images/about/${data?.image}`]" :image-files="imageData"/>-->
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