<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function cc (){
  router.push('/dash/products')
}



</script>


<template>
 <h1  lang="zh-Hans-HK" class="red" >骨</h1>
 <button @click="cc">ccc</button>

</template>

<style scoped>

</style>