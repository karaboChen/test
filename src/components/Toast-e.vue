<script setup>
import { ref,onMounted } from 'vue'
import Toast from 'bootstrap/js/dist/toast';
const  toast = ref(null)

 defineProps({
  msg: {
    type: Object,
    //default:() => ({}),
    // required: true
  }
});

onMounted(()=>{
  const toastEl = toast.value;
  const toa = new Toast(toastEl, {
      delay: 6000,
    });
    toa.show();
}) 
</script>

<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>