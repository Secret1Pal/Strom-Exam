<script setup>
import AdminBreadcrumb from '@/components/AdminBreadcrumb.vue';
import data from "../../assets/json/news.json"
import { inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
const { userState, login, logout } = inject("user")
if (!userState.isLoggedIn) {
  router.push("/")
}

const editPage = (id) =>{
    router.push(`/admin/news/put/${id}`)
}

const postPage = () =>{
    router.push(`/admin/news/post`)
}

const deleteNews = (id, title) =>{
    if(confirm(`Do you wish to delete ${title}? (${id})`)){
        console.log("Deleted")
    } else {
        console.log("Cancelled")
    }
}

function formatDateWYear(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-GB', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
</script>
<template>
<h1 v-if="!userState.isLoggedIn">Access Denied</h1>
<template v-else>
<AdminBreadcrumb title="News Table" nav="News"/>
<div class="plus-icon">
    <v-icon name="fa-plus-square" @click="postPage" scale="2" fill="green"/>
</div>
<div class="table-container">
<table>
    <thead>
        <tr>
            <td>Title</td>
            <td>Received</td>
            <td>ID</td>
            <td>Edit</td>
            <td>Delete</td>
        </tr>
    </thead>
    <tbody>
        <tr v-for="item in data" :key="item._id.$oid">
            <td class="table-content">{{ item.title }}</td>
            <td class="table-content">{{ formatDateWYear(item.received) }}</td>
            <td class="table-content">{{ item._id.$oid }}</td>
            <td class="table-icon"><v-icon name="fa-cog" @click="editPage(item._id.$oid)" scale="1.5" fill="orange"/></td>
            <td class="table-icon"><v-icon name="fa-ban" @click="deleteNews(item._id.$oid, item.title)" scale="1.5" fill="red"/></td>
        </tr>
    </tbody>
</table>
</div>
</template>
</template>

<style lang="scss" scoped>

.plus-icon{
    max-width: 900px;
    margin: 40px auto 10px;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    svg{
       &:hover{
            cursor: pointer;
        } 
    }
}

.table-container {
    max-width: 900px;
    max-height: 500px;
    overflow-y: auto;
    overflow-x: auto;
    border: 1px solid #e5e5e5;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead td {
    position: sticky;
    top: 0;
    background-color: #f2f2f2;
    font-weight: bold;
    border-bottom: 1px solid #e5e5e5;
}

td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
    
    svg{
        &:hover{
            cursor: pointer;
        }
    }
}

td.table-content{
    min-width: 100px;
}

td.table-icon{
    width: 60px;
}

</style>