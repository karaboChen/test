
<script setup>
import api from '@/api/backend.js'
import { useRoute } from 'vue-router'
import {ref} from 'vue'
const route = useRoute()
const  isLoading = ref(false)
const  orderId=ref('')
const order =ref({
  user:{}
})

async function getOrder(){
 const res = await api.get(`api/karabo-api-cake/order/${orderId.value}`)
  if (res.data.success) {
    order.value = res.data.order;
    console.log(order.value);
  }
}

async function payOrder(){
 const  res = await api.post(`api/karabo-api-cake/pay/${orderId.value}`)
  if (res.data.success) {
   await getOrder();
  }
}

orderId.value=route.params.orderId
console.log(orderId.value)
getOrder()
</script>




<template>
  <Load-ing :active="isLoading"></Load-ing>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
        </thead>
        <tbody>
        <tr v-for="item in order.products" :key="item.id">
          <td>{{ item.product.title }}</td>
          <td>{{ item.qty }}/{{ item.product.unit }}</td>
          <td class="text-end">{{ item.final_total }}</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2" class="text-end">總計</td>
          <td class="text-end">{{ order.total }}</td>
        </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
        <tr>
          <th width="100">Email</th>
          <td>{{ order.user.email }}</td>
        </tr>
        <tr>
          <th>姓名</th>
          <td>{{ order.user.name }}</td>
        </tr>
        <tr>
          <th>收件人電話</th>
          <td>{{ order.user.tel }}</td>
        </tr>
        <tr>
          <th>收件人地址</th>
          <td>{{ order.user.address }}</td>
        </tr>
        <tr>
          <th>付款狀態</th>
          <td>
            <span v-if="!order.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

