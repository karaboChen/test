
<script setup>
import {ref} from 'vue'
import OrderModal from '@/components/OrderModal.vue';
import DelModal from '@/components/DelModal.vue';
import Pagination from '@/components/PagiNation.vue';
import api from '../api/backend.js'
const orderModal= ref(null)
const delModal = ref(null)
const orders=ref({})
const is_New=ref(false)
const pagination=ref({})
const isLoading=ref(false)
const tempOrder=ref({})
const current_Page=ref(1)

async function getOrders(currentPage = 1){
  current_Page.value = currentPage;
  const res = await api.get(`api/karabo-api-cake/admin/orders?page=${ current_Page.value}`)
   console.log(res)
  isLoading.value = true;
  orders.value = res.data.orders;
  pagination.value = res.data.pagination;
  isLoading.value = false; 
}

function openModal(isNew,item) {
  tempOrder.value = { ...item };
  is_New.value = isNew;
  orderModal.value.myModal_show();
 }

function openDelOrderModal(item) {
  tempOrder.value = { ...item };
  console.log(tempOrder.value)
  delModal.value.myModal_show();
}

async function updatePaid(item) {
  isLoading.value = true;
  const paid = {
    is_paid: item.is_paid,
  };
  await api.put(`api/karabo-api-cake/admin/order/${item.id}`,{ data: paid })
  isLoading.value = false;
  getOrders(current_Page.value);
 // this.$httpMessageState(response, '更新付款狀態');
}

async function delOrder() {
  isLoading.value = true;
  const res = await api.delete(`api/karabo-api-cake/admin/order/${tempOrder.value.id}`)
  console.log( res);
  delModal.value.myModal_hide();
  getOrders(current_Page.value);
  }

  getOrders()
</script>


<template>
  <Load-ing :active="isLoading"></Load-ing>
  <table class="table mt-4">
    <thead>
    <tr>
      <th>購買時間</th>
      <th>Email</th>
      <th>購買款項</th>
      <th>應付金額</th>
      <th>是否付款</th>
      <th>編輯</th>
    </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length"
            :class="{'text-secondary': !item.is_paid}">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" :id="`paidSwitch${item.id}`"
                     v-model="item.is_paid"
                     @change="updatePaid(item)">
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="openModal(false, item)">檢視</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="openDelOrderModal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" ref="orderModal" @update-order="updatePaid"></OrderModal>
  <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
  <Pagination :pages="pagination" @update-Page="getOrders"></Pagination>
</template>

