<script setup>
import Toast from './Toast-e.vue';
import {inject,onMounted,ref } from 'vue'
const messages = ref([])
const { emitter } = inject('emitter')


onMounted(()=>{
    emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      messages.value.push({ style, title, content });
    });
})

</script>

<template>
  <div class="toast-container position-absolute pe-3 top-0 end-0">
    <Toast v-for="(msg, key) in messages" :key="key"
      :msg="msg"
    />
  </div>
</template>