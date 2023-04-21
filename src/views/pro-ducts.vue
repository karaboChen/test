<script setup>
import api from '../api/backend.js'
import product from '../components/Product-modal.vue'
import { ref, onMounted, inject } from 'vue'
//遠端資料
const products = ref([])
const pagination = ref({})
const modify = ref(false)
const tempProduct = ref({})
const modal = ref(null)
const isLoading = ref(true)
//const isLoading =ref(false)
const { emitter } = inject('emitter')
console.log(emitter)
//頁面讀取
async function Getproducts() {
  const res = await api.get('api/karabo-api-cake/admin/products')
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
    console.log(1)
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
        isLoading.value = false
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
        isLoading.value = false
      })
  }
  modal.value.myModal_hide()
}

function del(item) {
  isLoading.value = true
  api.delete(`/api/karabo-api-cake/admin/product/${item}`)
    .then(() => {
      Getproducts()
      isLoading.value = false
    })
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
          {{ item.origin_price }}
        </td>
        <td class="text-right">
          {{ item.price }}
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
  <product ref="modal" :product="tempProduct" @update-product="updateProduct"></product>
</template>