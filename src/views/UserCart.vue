<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/backend.js'
const router = useRouter()
const products= ref([])
const  cart = ref({})
const  coupon_code = ref('')
const status=ref({loadingItem:''})
const isLoading = ref(true)
function  getProduct(id) {
  router.push(`/user/product/${id}`);
 }

async function getProducts(){
  status.value.isLoading = true;
  const res = await api.get(`api/karabo-api-cake/products/all`)
  products.value = res.data.products;
 // console.log('products:', res);    
  isLoading.value = false;
   
 }
 

async function addCart(id){
  status.value.loadingItem = id;
  const cart = {
        product_id: id,
        qty: 1,
      };
      const res = await api.post(`api/karabo-api-cake/cart`,{ data: cart })  
      status.value.loadingItem = '';
      console.log(res);
      await  getCart()
} 

async function getCart(){
  isLoading.value = true
  const res = await api.get('api/karabo-api-cake/cart')
//  console.log(res)
  cart.value = res.data.data;
  isLoading.value = false;
}

async function  updateCart(item) {
      isLoading.value = true;
      status.value.loadingItem = item.id;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      const res = await api.put(`api/karabo-api-cake/cart/${item.id}`,{ data: cart })
      console.log(res);
      status.value.loadingItem = '';
      await  getCart();
     }

async function removeCartItem(item){
  isLoading.value = true;
  await api.delete(`/api/karabo-api-cake/cart/${item}`)
  await  getCart();
}

 getProducts()
 getCart()

</script>

<template>
  <Load-ing :active="isLoading"></Load-ing>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in products" :key="item.id">
            <td style="width: 200px">
              <div style="height: 100px; background-size: cover; background-position: center"
                   :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            </td>
            <td><a href="#" class="text-dark">{{ item.title }}</a></td>
            <td>
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button type="button" class="btn btn-outline-secondary"
                        @click="getProduct(item.id)">
                  查看更多
                </button>
                <button type="button" class="btn btn-outline-danger"
                :disabled="status.loadingItem === item.id" @click="addCart(item.id)">
                <div v-if="status.loadingItem === item.id"
                      class="spinner-grow text-danger spinner-grow-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
            <template v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button type="button" class="btn btn-outline-danger btn-sm"
                          :disabled="status.loadingItem === item.id"
                          @click="removeCartItem(item.id)">
                    <i class="bi bi-x"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>
                  <div class="input-group input-group-sm">
                    <input type="number" class="form-control"
                    :disabled="item.id === status.loadingItem"
                    @change="updateCart(item)"
                    v-model.number="item.qty" min="1">
                    <div class="input-group-text">/ {{ item.product.unit }}</div>
                  </div>
                </td>
                <td class="text-end">
                  <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                  {{ $filters.currency(item.final_total) }}
                </td>
              </tr>
            </template>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td class="text-end">{{ $filters.currency(cart.total) }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
            </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>