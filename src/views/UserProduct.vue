
<script setup>
import api from '../api/backend.js'
import { ref,onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const  product= ref({})
const  id= ref('')
const  isLoading= ref(false)

async function getProduct(){
 
 isLoading.value=true
 const res =  await api.get(`api/karabo-api-cake/product/${id.value}`)
 console.log(res.data);
 isLoading.value=false
 if (res.data.success){
  product.value = res.data.product;
  }
}

onMounted(()=>{
  id.value = route.params.productId;
  getProduct()
})

async function addToCart(id, qty = 1){
  const cart = {
        product_id: id,
        qty:qty,
      };
  isLoading.value=true
  await api.post(`api/karabo-api-cake/cart`,{data: cart})
  isLoading.value=false
  router.push('/user/cart');
}
</script>

<template>
  <Load-ing :active="isLoading"></Load-ing>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-8">
        <h2>{{ product.title }}</h2>
        <div>{{ product.content }}</div>
        <div>{{ product.description }}</div>
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
      </article>
      <div class="col-4">
        <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
        <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
        <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
        <hr>
        <button type="button" class="btn btn-outline-danger"
                @click="addToCart(product.id)">
          加到購物車
        </button>
      </div>
    </div>
  </div>
</template>

