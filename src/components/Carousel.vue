<script setup>
import { ref, computed } from 'vue'
import { register } from 'swiper/element/bundle'

register()
const props = defineProps(['showData','home'])
const navState = computed(() => props.showData.length > 1)
console.log(navState)
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
    autoplay-delay="5000"
    v-if="navState">
    <swiper-slide v-for="carousel in showData" :key="carousel.ScenicSpotID">
      <img class="swiper-slide-backdrop" :src="carousel.Picture.PictureUrl1" :alt="carousel.ScenicSpotName">
      <button class="swiper-slide-link" type="button" @click="toDetail(carousel)">{{ carousel.City }} | {{ carousel.ScenicSpotName }}</button>
    </swiper-slide>
    <div slot="container-end">
      <div class="swiper-btn-prev"></div>
      <div class="swiper-btn-next"></div>
    </div>
  </swiper-container>
  <template v-else>
    <swiper-container
      :navigation="navigationControl"
      :pagination="paginationControl"
      loop="true"
      autoplay-delay="5000"
      v-if="home">
      <swiper-slide v-for="carousel in showData" :key="carousel.ScenicSpotID">
        <img class="swiper-slide-backdrop" :src="carousel.Picture.PictureUrl1" :alt="carousel.ScenicSpotName">
      </swiper-slide>
      <div slot="container-end">
        <div class="swiper-btn-prev"></div>
        <div class="swiper-btn-next"></div>
      </div>
    </swiper-container>
    <swiper-container v-else>
      <swiper-slide>
        <img class="swiper-slide-backdrop" :src="showData.Picture.PictureUrl1" :alt="showData.ScenicSpotName">
      </swiper-slide>
    </swiper-container>
  </template>
</template>
<!-- <swiper-slide>
  <img class="swiper-slide-backdrop" src="https://fakeimg.pl/1500x500/646464/" alt="">
  <button type="button" class="swiper-slide-link">城市名稱 | 景點名稱</button>
</swiper-slide> -->
