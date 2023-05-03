<script setup>
import {ref,onMounted} from 'vue'
import Modal from 'bootstrap/js/dist/modal';
const  modal = ref(null)
const  myModal = ref(null)
const props = defineProps({
  item: {
    type: Object,
    default:() => ({}),
    // required: true
  }
});
const emits = defineEmits(['del-item'])
function DelItem() {
  emits('del-item');
}

onMounted(() => {
  myModal.value = new Modal(modal.value)
})

const myModal_show = () => {
  myModal.value.show()
}

const myModal_hide = () => {
  myModal.value.hide()
}

defineExpose({
  myModal_show,
  myModal_hide,
})

</script>




<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ props.item.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ props.item.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-danger"
                  @click="DelItem">確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
