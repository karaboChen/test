<script setup>
import Modal from 'bootstrap/js/dist/modal';
import {ref,watch,onMounted} from 'vue'
const modal = ref(null); //底下的模板
const myModal = ref({}) //回傳物件
const Article=ref({})
const time= ref(null)
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

watch(
  () => time.value, 
  () => {
    Article.value.create_at = Math.floor(new Date(time.value) / 1000);
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
          <h5 class="modal-title" id="exampleModalLabel">新增文章</h5>
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
            <label for="coupon_code">簡略心得</label>
            <input type="text" class="form-control" id="coupon_code" v-model="Article.description"
                   placeholder="請輸入大概意思">
          </div>
          <div class="mb-3">
            <label for="coupon_detail">詳細描述</label>
            <textarea v-model="Article.content" placeholder="請描述最真誠的想法"></textarea>
          </div>
          <div class="mb-3">
            <label for="due_date">發表時間</label>
            <input type="date" class="form-control" id="due_date"
                   v-model="time">
          </div>
          <div class="mb-3">
            <label for="price">管理人</label>
            <input type="text" class="form-control" id="price"
                   v-model="Article.author" placeholder="請輸入名字">
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     :true-value="1"
                     :false-value="0"
                     v-model="Article.isPublic" id="is_enabled">
              <label class="form-check-label" for="is_enabled">
                是否公開
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary"
                  @click="UpdateArticle">更新優惠券
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
