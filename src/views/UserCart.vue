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

async function  addCouponCode() {
  isLoading.value = true;
      const coupon = {
        code: coupon_code.value,
      };
     const res =await api.post(`api/karabo-api-cake/coupon`,{ data: coupon })
     coupon_code.value=''
     console.log(res)
      // this.$httpMessageState(response, '加入優惠券');
      await  getCart();
      isLoading.value = false;
    }
const form = ref({
  user: {
    name: '',
    email: '',
    tel: '',
    address: '',
  },
  message: '',
})

async function createOrder() {
  try {
    const order = form.value;
    await api.post(`api/karabo-api-cake/order`, { data: order })
    form.value.message=""
    form.value.user.name=""
    form.value.user.email=""
    form.value.user.tel=""
    form.value.user.address=""

  } catch (error) {
    console.log(error)
  }
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
    <div class="my-5 row justify-content-center">
        <v-Form class="col-md-6" v-slot="{ errors }"
              @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-Field id="email" name="email" type="email" class="form-control"
                     :class="{ 'is-invalid': errors['email'] }"
                     placeholder="請輸入 Email" rules="email|required"
                     v-model="form.user.email"></v-Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-Field id="name" name="姓名" type="text" class="form-control"
                     :class="{ 'is-invalid': errors['姓名'] }"
                     placeholder="請輸入姓名" rules="required"
                     v-model="form.user.name"></v-Field>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-Field id="tel" name="電話" type="tel" class="form-control"
                     :class="{ 'is-invalid': errors['電話'] }"
                     placeholder="請輸入電話" rules="required"
                     v-model="form.user.tel"></v-Field>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-Field id="address" name="地址" type="text" class="form-control"
                     :class="{ 'is-invalid': errors['地址'] }"
                     placeholder="請輸入地址" rules="required"
                     v-model="form.user.address"></v-Field>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea name="" id="message" class="form-control" cols="30" rows="10"
                      v-model="form.message"></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-danger">送出訂單</button>
          </div>
        </v-Form>
      </div>
  </div>
</template>