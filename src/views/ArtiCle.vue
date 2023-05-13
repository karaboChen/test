<script setup>
import {ref} from 'vue'
import api from '@/api/backend.js'
import NewArticle from '@/components/NewArticle.vue'
const page=ref(1)
const temp_article=ref({})
const new_article=ref()
//讀取全部文章
async function getArticle(Page=1){
  try {
    page.value=Page
     await api.get(`api/karabo-api-cake/admin/articles?page=${page.value}`)
  } catch (error) {
    console.log(error)
  }
}
//新增文章
async function addArticle(item){
  try {
    temp_article.value=item
    await api.post(`api/karabo-api-cake/admin/article`,{data:temp_article})
    
    await  getArticle()
  } catch (error) {
    console.log(error)
  }
}
function open(){
  new_article.value.myModal_show()
}

getArticle()
</script>




<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-around bg-dark text-white mt-2 py-2">
      <span><strong>全部文章</strong></span>
      <button @click="open">新增文章</button>
    </div>
    <br/>
    <div class="row">
      <div class="col-sm-3 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">tietle</h5>
            <p class="card-text">description</p>
            <button class="btn btn-primary">detail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NewArticle ref="new_article"  @update-article=addArticle />
</template>

<style scoped>
.aa{
  margin-left: 100px;
}
</style>