<script setup>
import api from '../api/backend.js'
import ToastMessages from '../components/ToastMessages.vue';
import emitter from '@/method/emiiter.js'
import { useRouter } from 'vue-router'
import { provide} from 'vue'
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
 
  <div class="container-fluid">
    <ToastMessages></ToastMessages>
    <RouterView />
  </div>
</template>