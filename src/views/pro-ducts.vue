<script setup>
import api from '../api/backend.js'
import product from '../components/Product-modal.vue'
import { ref,onMounted } from 'vue'
//遠端資料
let products=ref([])
let pagination=ref({})

const Getproducts = () =>{
  api.get('api/karabo-api-cake/admin/products')
  .then((res)=>{
    products.value = res.data.products
    pagination.value = res.data.pagination
  })
} 
Getproducts()

const modal = ref(null)
function aa (){
  modal.value.myModal_show()
}
onMounted(()=>{
  aa 
})

</script>


<template>
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button"
    @click="aa">
      增加一個產品
    </button>
  </div>
 <table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for ="item in products" :key="item.id">
      <td>{{item.category}}</td>
      <td>{{item.title}}</td>
      <td class="text-right">
        {{item.origin_price}}
      </td>
      <td class="text-right">
        {{item.price}}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm">編輯</button>
          <button class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<product  ref="modal"></product>
</template>