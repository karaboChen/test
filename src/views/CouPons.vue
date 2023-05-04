<script setup>
import api from '@/api/backend.js'
import {ref} from 'vue'
import CouponModal from '@/components/CouponModal.vue';
import DelModal from '@/components/DelModal.vue';
const delModal =ref(null)
const couponModal =ref(null)
const coupons =ref({})
const tempCoupon=ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
})

const isLoading =ref(false)
const is_New =ref(false)

function  openCouponModal(isNew, item){
is_New.value = isNew;
  if (is_New.value) {
    tempCoupon.value = {
     due_date: new Date().getTime() / 1000,
        };
  } else {
    tempCoupon.value = { ...item };
  }
  couponModal.value.showModal();
}

function  openDelCouponModal(item){
  tempCoupon.value = { ...item };
  delModal.value.showModal();
}

async function getCoupons(){
  isLoading.value = true;
  const res = await api.get(`api/karabo-api-cake/admin/coupons`)
  console.log(res)
  coupons.value = res.data.coupons;
  isLoading.value = false;
}

async function updateCoupon(tempCoupon){
   if (is_New.value){
    const res = await api.post(`api/karabo-api-cake/admin/coupon`, { data: tempCoupon.value })
    console.log(res, tempCoupon);
    // this.$httpMessageState(response, '新增優惠券');
    await getCoupons();
   couponModal.value.hideModal();
   }
   else{ 
    const res = await api.put(`api/karabo-api-cake/admin/coupon/${tempCoupon.value.id}`,{ data: tempCoupon.value })
    console.log(res);
   // this.$httpMessageState(response, '新增優惠券');
    await  getCoupons();
    couponModal.value.hideModal();
   }
}

async function delCoupon(){
  isLoading.value = true;
 const res = await api.delete(`api/karabo-api-cake/admin/coupon/${tempCoupon.value.id}`)
 console.log(res,tempCoupon.value)
// this.$httpMessageState(res, '刪除優惠券');
delModal.value.hideModal();
await getCoupons();
}

getCoupons()

</script>




<template>
  <div>
    <Load-ing :active="isLoading"></Load-ing>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ $filters.date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未起用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openCouponModal(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openDelCouponModal(item)"
            >刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <CouponModal :coupon="tempCoupon" ref="couponModal"
    @update-coupon="updateCoupon"/>
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
  </div>
</template>

