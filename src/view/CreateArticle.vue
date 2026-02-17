<template>
    <div>
        <!-- Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <div class="flex-grow-1 content">
                <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-6">
                    <div class="card p-4">
                        <h5 class="fw-bold mb-3">Create New Article</h5>
                        <form @submit.prevent="handleCreate()">
                            
                            <!-- Title -->
                            <div class="mb-3">
                                <label class="form-label">Article Title</label>
                                <input type="text" 
                                       class="form-control" 
                                       placeholder="Enter article title" 
                                       v-model="form.title"/>
                                <p class="text-danger">{{ error.title }}</p>
                            </div>

                            <!-- Category -->
                            <div class="mb-3">
                                <label class="form-label">Category</label>
                                <select class="form-select" v-model="form.categoryId">
                                    <option selected disabled>Choose category</option>
                                    <option v-for="item in categoryStore.categories" 
                                            :key="item.id" 
                                            :value="item.id">
                                            {{ item.name }}
                                    </option>
                                </select> 
                                <p class="text-danger">{{ error.categories }}</p>
                            </div>

                            <!-- Thumbnail -->
                            <div class="mb-3">
                                <label class="form-label">Thumbnail Image</label>
                                <input type="file" 
                                       @change="handlefile" 
                                       class="form-control" />
                                <p class="text-danger">{{ error.Thumbnail }}</p>
                            </div>

                            <!-- Content -->
                            <div class="mb-3">
                                <label class="form-label">Content</label>
                                <textarea class="form-control" 
                                          rows="5"
                                          placeholder="Write your article content..." 
                                          v-model="form.content"></textarea>
                                <p class="text-danger">{{ error.content }}</p>
                            </div>

                            <!-- Actions -->
                            <div class="d-flex justify-content-end gap-2">
                                <button type="reset" 
                                        class="btn btn-outline-secondary">
                                    Cancel
                                </button>

                               
                                <button type="submit" 
                                        class="btn btn-primary" 
                                        :disabled="loading">
                                    
                                    <span v-if="loading">
                                        <span class="spinner-border spinner-border-sm me-2"></span>
                                        Publishing...
                                    </span>

                                    <span v-else>
                                        Publish Article
                                    </span>

                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/http';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import router from '@/router';
import { useCategoryStore } from '@/stores/category';
import { notify } from '@/utils/toast';
import { isContent, required, validation } from '@/utils/validation';
import { onMounted, reactive, ref } from 'vue';

let categoryStore = useCategoryStore();

let form = ref({
    title : "",
    content : "",
    categoryId : ""
})

let file = ref(null);
let loading = ref(false); 

onMounted(async () =>{
    await categoryStore.fetchCategory();
})

let error = reactive({
    title : '',
    categories : '',
    Thumbnail : '',
    content : ''
})

function validate(){
    error.title = required(form.value.title , 'Title is required')
    error.categories = required(form.value.categoryId , 'Category is required')
    error.Thumbnail = required(file.value, 'Please select image is required ')
    error.content = validation(form.value.content, [
        (v)=> required(v , 'Content is required'),
        (v)=> isContent(v, 10 ,'Content must be at least 10 characters long.')
    ])
    return !error.title && !error.categories && !error.Thumbnail && !error.content
}

const handleCreate = async () =>{
    if(!validate()) return

    loading.value = true; 
    try{
        let res = await api.post('/articles', form.value);
        let articleID = res.data.data.id;

        if(file.value){
            let fData = new FormData();
            fData.append('thumbnail' , file.value)
            await api.post(`/articles/${articleID}/thumbnail` , fData);
        }

        notify.success(res.data.message , '/articles') 

    }
    catch(error){
        notify.error(error.response.data?.details )
    }
    finally{
        loading.value = false; 
    }
}

const handlefile = (event) =>{
    let selectFile = event.target.files[0];
    if(selectFile){
        file.value = selectFile;
    }
}
</script>

<style scoped>
</style>
