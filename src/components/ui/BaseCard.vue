<template>
    <div class="col-md-6 col-lg-4" v-for="article in articles" :key="article.id">
        <router-link :to="{name : 'detailArticle' , params : {id : article.id}}" class="nav-link">
            <div class="card h-100 p-3">
                <img :src="article.thumbnail" class="card-img-top rounded-3 mb-3" alt="" height="300px" />

                <span class="badge bg-warning text-dark mb-2">Draft</span>

                <h5 class="fw-bold">{{ article.title }}</h5>
                <p class="text-muted small">
                    {{ article.content.slice(0, 100) }}
                </p>

                <div class="d-flex align-items-center mt-auto">
                    <img :src="article.creator.avatar" class="rounded-circle me-2" alt="" width="40px" height="40px">
                    <div class="small text-muted">
                        <small class="text-muted">By Creator : {{ article.creator.firstName + " " +
                            article.creator.lastName }}</small><br>
                        <span>{{ new Date(article.createdAt).toLocaleDateString() }}</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script setup>
let propts = defineProps({
    articles: Array
})
</script>

<style scoped></style>