<script setup>
import Modal from 'bootstrap/js/dist/modal';
import {ref,watch,onMounted} from 'vue'
const modal = ref(null); //底下的模板
const myModal = ref({}) //回傳物件
const tempCoupon=ref({})
const due_date= ref(null)
const myModal_show = () => {
  myModal.value.show()
}

const myModal_hide = () => {
  myModal.value.hide()
}

onMounted(() => {
  myModal.value = new Modal(modal.value)
})

defineExpose({
  myModal_show,
  myModal_hide,
})

const props = defineProps({
  coupon: {
    type: Object,
  }
})

const emits = defineEmits(['update-coupon'])
function UpdateCoupon() {
  emits('update-coupon', tempCoupon.value);
}

watch(
  () => props.coupon, 
  () => {
    tempCoupon.value=props.coupon
    const dateAndTime = new Date(tempCoupon.value.due_date * 1000).toISOString().split('T');
    due_date.value = dateAndTime[0];
  },
  { deep: true }
);

watch(
  () => due_date.value, 
  () => {
    tempCoupon.value.due_date = Math.floor(new Date(due_date.value) / 1000);
  },
  { deep: true }
);

</script>


<template>
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                   placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                   placeholder="請輸入優惠碼">
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input type="date" class="form-control" id="due_date"
                   v-model="due_date">
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input type="number" class="form-control" id="price"
                   v-model.number="tempCoupon.percent" placeholder="請輸入折扣百分比">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     v-model="tempCoupon.is_enabled" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="UpdateCoupon">更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
