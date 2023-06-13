<script setup>
import Modal from 'bootstrap/js/dist/modal';
import {ref,onMounted,watch} from 'vue'
const modal = ref(null); //底下的模板
const myModal = ref({}) //回傳物件
const Article=ref({})
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

const emits = defineEmits(['update-article'])
function UpdateArticle() {
  emits('update-article', Article.value);
}

const props = defineProps({
  temp_time: {
    type: Number,
  }
})


watch(
  () => props.temp_time, 
  () => { 
    const dateAndTime = new Date(props.temp_time * 1000).toISOString().split('T');
    due_date.value = dateAndTime[0];
  },
  { deep: true }
);

watch(
  () => due_date.value, 
  () => {
    Article.value.create_at = Math.floor(new Date(due_date.value) / 1000);
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
          <h5 class="modal-title" id="exampleModalLabel">文章</h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="title">標題</label>
            <input type="text" class="form-control" id="title" v-model="Article.title"
                   placeholder="請輸入標題">
          </div>
          <div class="mb-3">
            <label for="description">內容</label>
             <textarea class="form-control" v-model="Article.description" required  id="description"></textarea>
          </div>
          <div class="mb-3">
            <label for="image">圖片</label>
            <input type="text" class="form-control"  v-model="Article.image" id="image">
          </div>
          <div class="mb-3">
            <label for="tag">標籤</label>
            <input type="text" class="form-control" v-model="Article.tag" required id="tag">
          </div>
          <div>
           <label for="create_at">建立時間</label>
           <input  class="form-control" type="date" v-model="due_date" required id="create_at">
          </div>
          <div class="mb-3">
            <label for="author">作者</label>
            <input type="text" class="form-control" v-model="Article.author" required id="author">
          </div>
          <div class="mb-3">
            <label for="isPublic">是否公開</label>
            <input type="checkbox" v-model="Article.isPublic" id="isPublic">
          </div>
          <div class="mb-3">
            <label for="content">內容</label>
             <textarea class="form-control"   v-model="Article.content" required id="content"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="UpdateArticle">更新文章
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
