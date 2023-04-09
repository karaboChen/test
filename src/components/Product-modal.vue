<script setup>
import Modal from 'bootstrap/js/dist/modal';
import { ref,onMounted } from 'vue'
const myModal = ref({}) //回傳物件

// eslint-disable-next-line no-unused-vars
const myModal_show =()=>{
  myModal.value.show()
}
// eslint-disable-next-line no-unused-vars
const myModal_hide =()=>{
  myModal.value.hide()
}

const modal = ref(null);
onMounted(()=>{
   myModal.value = new Modal(modal.value) 
})



</script>

<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
