<template>
  <div>
    <Navbar></Navbar>
    <div class="d-flex">

      <Sidebar></Sidebar>
      <!-- Main Content -->
      <div class="flex-grow-1 content p-4">
        <!-- Page Title -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold">Article List</h3>
          <div>
            <select class="form-select" v-model="sortDir">
                 <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </select>

          </div>

          <div class=" mb-3">
              <input type="text" class="form-control" id="eamilInput" placeholder="Search Articles" v-model="search">
            </div>
        </div>

        <!-- Stats -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Total Articles</h6>
              <h3 class="fw-bold">120</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Published</h6>
              <h3 class="fw-bold text-success">85</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Draft</h6>
              <h3 class="fw-bold text-warning">35</h3>
            </div>
          </div>
        </div>

        <!-- Article Cards -->
        <div class="row g-4"> 
          <BaseCard :articles="ArticleStore.articles"></BaseCard>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import { useArticleStore } from '@/stores/article';
import { onMounted } from 'vue';
import { ref , watch} from 'vue';

let ArticleStore = useArticleStore();
let search = ref('');
let sortDir = ref ('')


watch([search, sortDir], async ([newSearch, newSort]) => {
  await ArticleStore.fetchArticles({
    search: newSearch,
    sortDir: newSort
  })
})

onMounted (async () =>{
  await ArticleStore.fetchArticles();
})

</script>

<style  scoped> </style>