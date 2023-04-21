<script setup>
import api from '../api/backend.js'
import emitter from '@/method/emiiter';
import { useRouter } from 'vue-router'
import { provide } from 'vue'
import Navbar from '../components/Nav-bar.vue'
const router = useRouter()
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
api.defaults.headers.common['Authorization'] = token;
api.post('api/user/check')
  .then((res)=>{
    if (!res.data.success) {
        router.push('/login')
      }
  })
provide('emitter',emitter)
</script>

<template>
  <Navbar />
  <div class="container-fluid">
    <RouterView />
  </div>
</template>