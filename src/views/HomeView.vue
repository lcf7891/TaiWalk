<script setup>
import Carousel from '@/components/Carousel.vue'
import CardHor from '@/components/CardHorizontal.vue'
import CardVer from '@/components/CardVertical.vue'
</script>

<template>
  <!-- 標語與搜尋 -->
  <article class="md:py-10 lg:px-[80px] md:mb-5 mb-9">
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
      <div class="col-span-2 md:flex md:flex-col md:justify-end">
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
          <img src="@/assets/images/icon/search30.svg" alt="">
          搜尋
        </button>
      </div>
    </div>
  </article>
  
  <Carousel />

  <article class="grid lg:grid-cols-2 grid-cols-1 lg:gap-y-3 lg:gap-x-7 gap-y-4 mb-9">
    <CardHor v-for="num in 4" :key="num+1"></CardHor>
  </article>
  <article class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4">
    <CardVer v-for="num in 4" :key="num+2"></CardVer>
  </article>
</template>
