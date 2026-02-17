<template>
    <Navbar></Navbar>
    <div class="d-flex">
        <Sidebar></Sidebar>
        <div class="flex-grow-1 content">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="card p-4">
                        <h5 class="fw-bold mb-3">Edit Article</h5>
                        <form @submit.prevent="handleUpdate()">
                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" class="form-control" placeholder="Enter article title"
                                    v-model="form.title" />
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <!-- {{ categoryStore.categories }} -->
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option value="" disabled>Choose category</option>
                                    <option v-for="item in categoryStore.categories" :key="item.id" :value="item.id">
                                        {{ item.name }}
                                    </option>
                                </select>

                            </div>

                            <!-- Status -->
                            <!-- <div class="mb-3">
                                <label class="form-label">Status</label>
                                <select class="form-select">
                                    <option value="published">Published</option>
                                    <option value="draft">Draft</option>
                                </select>
                            </div> -->

                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file" class="form-control" @change="handlefile"/>
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" rows="5" placeholder="Write your article content..."
                                    v-model="form.content"></textarea>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="reset" class="btn btn-outline-secondary">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    Update Article
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import router from '@/router';
import { useCategoryStore } from '@/stores/category';
import { onMounted, ref } from 'vue';
import api from '@/api/http';
import { useRoute } from 'vue-router';

let categoryStore = useCategoryStore();
let route = useRoute();
let id = route.params.id;

let form = ref({
    title: "",
    content: "",
    categoryId: ""
})
let file = ref(null);
onMounted(async () => {
    await categoryStore.fecthCategory();
    try{
        let res = await api.get(`/articles/${id}`);
        let article = res.data.data;
        form.value.title = article.title;
        form.value.content = article.content;
        form.value.categoryId = article.category.id;
    }catch(err){
        console.error(err);
    }
})

const handleUpdate = async () =>{
    // console.log(form.value);
    try{
        let res = await api.put(`/articles/${id}`, form.value);
        console.log(res);
        let articleID = res.data.data.id;
        console.log(res.data.data.id);
        if(file.value){
            let fData = new FormData();
            fData.append('thumbnail' , file.value)
            let res = await api.post(`/articles/${articleID}/thumbnail` , fData);
            // console.log(res);
        }
        router.push('/articles');
    }
    catch(error){
        console.error(error);
    }   
}
const handlefile = (event) =>{
    let selectFile = event.target.files[0];
    console.log(selectFile);
    if(selectFile){
        file.value = selectFile;
    }
}


</script>
<style scoped></style>