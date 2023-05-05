<script setup>
import Pagination from'../components/PagiNation.vue'
import api from '../api/backend.js'
import product from '../components/Product-modal.vue'
import DelModal from '@/components/DelModal.vue';
import { ref, onMounted, inject } from 'vue'
//遠端資料
const products = ref([])
const pagination = ref({})
const modify = ref(false)
const tempProduct = ref({})
const modal = ref(null)
const delModal = ref(null)
const isLoading = ref(true)
const emitter = inject('emitter')


//頁面讀取
async function Getproducts(page=1) {
  const res = await api.get(`api/karabo-api-cake/admin/products/?page=${page}`)
  products.value = res.data.products
  pagination.value = res.data.pagination
  isLoading.value = false
}

onMounted(() => {
  Getproducts()
})


//判斷是新增 還是 編輯
function newItem(isNew, item) {
  if (isNew) {
    modify.value = false
    tempProduct.value = {}
  } else {
    modify.value = true
    tempProduct.value = { ...item }
  }

  modal.value.myModal_show()
}
//新增商品 或是修改商品
function updateProduct(item) {
  isLoading.value = true
  //編輯商品
  if (modify.value === true) {
    api.put(`api/karabo-api-cake/admin/product/${item.id}`, { data: tempProduct.value })
      .then(() => {
        Getproducts()
      })
  }
  else {
    //新增商品
    tempProduct.value = item
    api.post('api/karabo-api-cake/admin/product', { data: tempProduct.value })
      .then((res) => {
        if (res.data.success) {
          Getproducts()
          emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } else {
          emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: res.data.message.join('、'),
          });
        }
      })
  }
  modal.value.myModal_hide()
}

function del(item) {
  isLoading.value = true
  api.delete(`/api/karabo-api-cake/admin/product/${item}`)
    .then(() => {
      Getproducts()
    })
}
async function delProduct(){
const res  = api.delete(`api/karabo-api-cake/admin/product/${tempProduct.value.id}`)
console.log(res.data);
delModal.value.myModal_hide()
await Getproducts()
}

</script>


<template>
  <Load-ing :active="isLoading"></Load-ing>
  <div class="text-end mt-3">
    <button class="btn btn-primary" type="button" @click="newItem(true)">
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
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ $filters.currency(item.origin_price) }}
        </td>
        <td class="text-right">
          {{ $filters.currency(item.price) }}
        </td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="newItem(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="del(item.id)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @update-Page="Getproducts"></Pagination>
  <product ref="modal" :product="tempProduct" @update-product="updateProduct"></product>
  <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct"/>
</template>