
<script setup>
import api from '../api/backend.js'
import {ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref({
    "username": '',
    "password": ''
  }
)
const login = () => {
  api.post('admin/signin',user.value)
  .then((res)=>{
      if (res.data.success) {
        const { token, expired } = res.data
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
        router.push('/dash/products')
      }
  })
}

</script>


<template>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="login">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input v-model.trim="user.username" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input v-model.trim="user.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required />
        </div>

        <div class="text-end mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </div>
      </div>
    </form>
  </div>
</template>