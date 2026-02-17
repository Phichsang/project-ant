<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      <div class="container-fluid">
        <span class="navbar-brand fw-bold">📰 Article Dashboard</span>
        <div class="d-flex align-items-center gap-3">
  <i class="bi bi-bell fs-5"></i>
  <router-link to="/profile"> <img :src="ProfileStore.profile?.avatar" class="rounded-circle" width="50px" alt="Profile"/> </router-link>
</div>

      </div>
    </nav>
</template>
<script setup>
import {  userProfileStore } from '@/stores/profile'
import { onMounted } from 'vue';

let ProfileStore = userProfileStore()
onMounted(()=>{
  ProfileStore.fetchProfile()
})
</script>