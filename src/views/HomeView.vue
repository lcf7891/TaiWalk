<script setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import Carousel from '@/components/Carousel.vue'
import CardHor from '@/components/CardHorizontal.vue'
import CardVer from '@/components/CardVertical.vue'

const carouselData = ref([])

// 取得資料
const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData} = storeToRefs(getAPI)
getAPI.getData('ScenicSpot')

// 篩選資料
const randomData = useRandomDataStore()

function getCarouselData() {
  const imgData = randomData.FilterNoPictures(ScenicSpotData.value)
  carouselData.value = randomData.ExtractRandomData(imgData, 6)
}
watchEffect(() => {
  if (ScenicSpotData.value.length) {
    getCarouselData()
  }
})
</script>

<template>
  <!-- 標語與搜尋 -->
  <header class="md:py-10 lg:px-[80px] md:mb-5 mb-9">
    <div class="grid md:grid-cols-5">
      <div class="col-span-3 md:text-left text-center">
        <h2 class="leading-normal font-light
            lg:text-[48px] md:text-[38px] text-[28px]
            lg:mb-5 md:mb-4 mb-3">
          探索<span class="border-b-2 border-line">台灣之美</span><br>
          讓我們更親近這片土地
        </h2>
        <p class="text-primary md:mb-0 mb-8">
          <img class="inline-block align-text-bottom"
                src="@/assets/images/icon/spot24_Y.svg" alt="spot">
          <span class="md:text-xl text-sm md:mr-2 mr-1">台灣旅遊景點導覽</span>
          <span class="md:text-sm text-xs font-bold">Taiwan Travel Guide</span>
        </p>
      </div>
      <form class="col-span-2 md:flex md:flex-col md:justify-end">
        <label for="SearchOptions">
          <select class="mb-2" name="SearchOptions" id="SearchOptions">
            <option value="ScenicSpot">探索景點</option>
            <option value="Activity">節慶活動</option>
            <option value="Restaurant">品嚐美食</option>
          </select>
        </label>
        <label for="SearchKey">
          <input class="mb-2" type="text" name="SearchKey"
                  id="SearchKey" placeholder="你想去哪裡？請輸入關鍵字">
        </label>
        <button class="btn-search w-full" type="button">
          <img src="@/assets/images/icon/search30.svg" alt="search icon">
          搜尋
        </button>
      </form>
    </div>
  </header>
  <!-- 輪播 -->
  <article class="md:mb-9 mb-6">
    <Carousel v-if="carouselData.length > 0">
      <template #default>
        <swiper-slide v-for="carousel in carouselData" :key="carousel.ScenicSpotID">
          <img class="swiper-slide-backdrop" :src="carousel.Picture.PictureUrl1" :alt="carousel.ScenicSpotName">
          <button class="swiper-slide-link" type="button">{{ carousel.City }} | {{ carousel.ScenicSpotName }}</button>
        </swiper-slide>
      </template>
    </Carousel>
  </article>
  
  <!-- 活動 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">近期活動</h3>
      <router-link class="btn-arrow text-tertiary font-medium mr-2" to="/">查看更多活動</router-link>
    </div>
    <!-- 橫式卡 -->
    <section class="grid lg:grid-cols-2 grid-cols-1 lg:gap-y-3 lg:gap-x-7 gap-y-4 mb-9">
      <CardHor v-for="num in 4" :key="num+1"></CardHor>
    </section>
  </article>
  
  <!-- 景點 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">熱門景點</h3>
      <router-link class="btn-arrow text-tertiary font-medium mr-2" to="/">查看更多景點</router-link>
    </div>
    <!-- 直式卡 -->
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <CardVer v-for="num in 4" :key="num+2"></CardVer>
    </section>
  </article>

  <!-- 美食 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">味蕾狂熱美食</h3>
      <router-link class="btn-arrow text-tertiary font-medium mr-2" to="/">查看更多美食</router-link>
    </div>
    <!-- 直式卡 -->
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <CardVer v-for="num in 4" :key="num+2"></CardVer>
    </section>
  </article>
</template>
