<script setup>


</script>


<template>
 <h1 class="red">測試用</h1>

</template>

<style scoped>
/* 用於任何寬度小於或等於設定值的瀏覽器 */
@import url('../styles/style.css') screen and (max-width: 480px); 
@media screen and (min-width: 480px) and (max-width: 720px) {
  .red{
    color: blue;
   }
}
@media screen and (min-width: 720px) and (max-width: 1024px) {
  .red{
    color: green;
   }
}
@media (min-width: 1025px) {
  .red{
    color: plum;
   }
}
</style>