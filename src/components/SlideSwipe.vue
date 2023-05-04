<template>
  <swiper-container :pagination="true" :autoplay="{delay: 2500,disableOnInteraction: false}">
    <swiper-slide class="a" >
        <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80" alt="">
      </swiper-slide>
      <swiper-slide class="a">
        <img src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80" alt="">
      </swiper-slide>
      <swiper-slide class="a">
        <img src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="">
      </swiper-slide>
    </swiper-container>
</template>


<style scoped>
.a {
  width: 400px;
  height: 400px;
}
.a img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>