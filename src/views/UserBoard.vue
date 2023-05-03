<script setup>
import emitter from '@/method/emiiter';
import ToastMessages from '@/components/ToastMessages.vue';
import { provide} from 'vue'
import { RouterLink } from 'vue-router'
provide('emitter',emitter)

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/user/cart">用戶端範例</router-link>
      <router-link class="navbar-brand" to="/home">回家</router-link>
    </div>
  </nav>
  <div class="container-fluid mt-3 position-relative">
    <ToastMessages></ToastMessages>
    <router-view/>
  </div>
</template>



