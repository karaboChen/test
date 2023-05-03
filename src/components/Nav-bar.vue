<script setup>
import api from '../api/backend.js'
import { ref,reactive } from 'vue'
import { useRouter,RouterLink } from 'vue-router'
const router = useRouter()
const logout = () => {
  api.post('/logout')
    .then((res) => {
      if (res.data.success)
      router.push('/login')
    })
}

const lists = reactive({
  list_index :ref(0),
  list:[{name:'產品',link:'/dash/products'},{name:'訂單',link:'/dash/orders'},{name:'優惠券',link:'/dash/coupons'}],
  currency_index(idx){lists.list_index=idx}
})

</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-for=" (list,index) in lists.list" :key="list.name">
          <router-link  @click="lists.currency_index(index)"  :class="{active:lists.list_index === index}"   class="nav-link" :to=list.link>{{list.name}}</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click.prevent="logout">登出</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<style scoped>
</style>