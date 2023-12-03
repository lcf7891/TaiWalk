<script setup>
import Breadcrumb from '@/components/breadcrumb.vue'
</script>

<template>
  <Breadcrumb />
  <form class="grid md:grid-cols-8 md:gap-2 md:pt-2 md:pb-9 mb-4">
    <label class="md:col-span-2 md:mb-0 mb-2" for="SelectCounty">
      <select class="h-full" name="SelectCounty" id="SelectCounty">
        <option value="all">全部縣市</option>
      </select>
    </label>
    <label class="md:col-span-4 md:mb-0 mb-2" for="SearchKey">
      <input class="h-full md:mb-0 mb-2" type="text" name="SearchKey" id="SearchKey" placeholder="你想去哪裡？請輸入關鍵字">
    </label>
    <button class="md:col-span-2 btn-search w-full" type="button">
      <img src="@/assets/images/icon/search30.svg" alt="search icon">
      搜尋
    </button>
  </form>
  <article>
    <h3 class="md:text-4xl text-2xl font-light mb-4">熱門主題</h3>
    <div class="grid md:grid-cols-8 grid-cols-2 md:gap-7 gap-4">
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-1.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">自然風景類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-2.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">觀光工廠類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-3.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">遊憩類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-4.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">休閒農業類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-5.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">生態類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-6.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">溫泉類</span>
      </button>
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" src="@/assets/images/theme-bg1-7.svg" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">古蹟類</span>
      </button>
    </div>
  </article>
</template>
