<script setup>
import { ref } from 'vue';
import { register } from 'swiper/element/bundle';

register()

const navigationControl = ref({
  prevEl: '.swiper-btn-prev',
  nextEl: '.swiper-btn-next',
})
const paginationControl = ref({
  clickable: true,
  dynamicBullets: true,
})
</script>

<template>
  <swiper-container
    :navigation="navigationControl"
    :pagination="paginationControl"
    loop="true"
    autoplay-delay="3000">
    <slot name="default">
    </slot>
    <div slot="container-end">
      <div class="swiper-btn-prev"></div>
      <div class="swiper-btn-next"></div>
    </div>
  </swiper-container>
</template>
<!-- <swiper-slide>
  <img class="swiper-slide-backdrop" src="https://fakeimg.pl/1500x500/646464/" alt="">
  <button type="button" class="swiper-slide-link">城市名稱 | 景點名稱</button>
</swiper-slide> -->
