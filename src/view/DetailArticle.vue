<template>
    <div>
        <!-- Top Navbar -->
        <Navbar></Navbar>
        <div class="d-flex">
            <!-- Sidebar -->
            <Sidebar></Sidebar>
            <!-- Main Content -->
            <div class="container py-5">
                <div>
                    <h3 class="fw-bold mb-3">{{ articleDetail.title }}</h3>
                    <img :src="articleDetail?.thumbnail" class="img-fluid rounded-4 shadow-sm mb-4" alt="thumbnail"
                        style="object-fit: cover; width: 100%; height: 500px;" />
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <img :src="articleDetail.creator?.avatar" class="rounded-circle shadow-sm" width="40"
                            height="40" />
                        <div>
                            <div class="fw-semibold">{{ `${articleDetail.creator?.firstName}  ${articleDetail.creator?.lastName} ` }}</div>
                            <!-- <small class="text-muted"></small> -->
                        </div>
                    </div>
                    <div class="article-content">{{ articleDetail.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api/http';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { onMounted,  ref } from 'vue';
import { useRoute } from 'vue-router';

let route = useRoute()

let id = route.params.id
let articleDetail = ref([])
onMounted(async ()=>{
  let res = await api.get(`/articles/${id}`)
  articleDetail.value = res.data.data;  

})


</script>

<style lang="scss" scoped></style>