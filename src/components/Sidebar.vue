<template>
    <div class="sidebar p-3">
        <h5 class="text-white mb-4">Admin Panel</h5>
        <router-link :to="{name:'home'}">Dashboard</router-link>
        <router-link :to="{name:'articles'}">Article</router-link>
        <a href="#"><i class="bi bi-people me-2"></i> Users</a>
        <router-link :to="{name : 'category'}"><i class="bi bi-tags me-2"></i> Categories</router-link>
        <a href="#"><i class="bi bi-gear me-2"></i> Settings</a>
        <hr class="border-secondary" />
        <a href="#" @click="handleLogout"><i class="bi bi-box-arrow-left me-2"></i> Logout</a>
      </div>
</template>
<script setup>
  import router from '@/router';
import { useAuthStore } from '@/stores/auth'

  let auth = useAuthStore()

  async function handleLogout(){
     await auth.logout();
     router.push('/login');
   }
</script>