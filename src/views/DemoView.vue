
<script setup>
import api from '@/api/backend.js'
import{ref} from 'vue'
const content = ref('')

const text_read = ref('')
const text_id = ref('')
const text_name = ref('')
async function read(){
 const res = await api.get(`api/table/users?id=${text_read.value}&name=${text_name.value}`)
 console.log(res)
 content.value=res.data
}

async function add(){
 const res = await api.post(`api/table/users`,{id:text_id.value,name:text_name.value})
  console.log(res)
  await read()
}

async function modify(){
 const res = await api.put(`api/table/users`,{id:text_id.value,name:text_name.value})
  console.log(res)
  await read()
}

async function del(){
 const res = await api.delete(`api/table/users/${text_id.value}`)
  console.log(res)
  await read()
}


</script>


<template>
<h1>內容:{{content}}</h1>
 <button @click="read">查詢</button>
 輸入編號<input type="text" v-model="text_read">
 <div>
   <button @click="add">新增</button>
   <button @click="modify">修改</button>
   <button @click="del">刪除</button>
   姓名<input type="text" v-model="text_name">
   編號<input type="text" v-model="text_id">
</div>

</template>