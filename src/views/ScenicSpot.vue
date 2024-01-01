<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useZipCodeStore } from '@/stores/useZipCodeStore'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { useSearchStore } from '@/stores/useSearchStore'
import Breadcrumb from '@/components/BreadCrumb.vue'
import Card from '@/components/CardVertical.vue'
// import PageNav from '@/components/pageNavigation.vue'

const getAPI = useGetDataStore()
// 動態圖片路徑
const themeList = ref([
  {
    content: '自然風景類',
    backdrop: 'Theme-bg1-1.svg'
  },
  {
    content: '觀光工廠類',
    backdrop: 'Theme-bg1-2.svg'
  },
  {
    content: '遊憩類',
    backdrop: 'Theme-bg1-3.svg'
  },
  {
    content: '休閒農業類',
    backdrop: 'Theme-bg1-4.svg'
  },
  {
    content: '生態類',
    backdrop: 'Theme-bg1-5.svg'
  },
  {
    content: '溫泉類',
    backdrop: 'Theme-bg1-6.svg'
  },
  {
    content: '古蹟類',
    backdrop: 'Theme-bg1-7.svg'
  },
])
function imgUrl(url) {
  return getAPI.GetImgUrl(url)
}
// 載入景點全部資料
const { ScenicSpotData } = storeToRefs(getAPI)
// 渲染縣市選項
const zipCode = useZipCodeStore()
const { cityName } = storeToRefs(zipCode)
// 載入搜尋結果
const searchData = useSearchStore()
const { SearchResult } = storeToRefs(searchData)
</script>

<template>
  <Breadcrumb />
  <form class="grid md:grid-cols-8 md:gap-2 md:pt-2 md:pb-9 mb-4">
    <label class="md:col-span-2 md:mb-0 mb-2" for="SelectCounty">
      <select class="h-full" name="SelectCounty" id="SelectCounty">
        <option value="all">全部縣市</option>
        <option :value="city" v-for="city in cityName" :key="city">
          {{ city }}
        </option>
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
  <!-- <PageNav :dataList="ScenicSpotData" /> -->
  <article class="md:mb-40 mb-15" v-if="SearchResult.length > 0">
    <div class="md:mb-3 mb-2">
      <h2 class="inline-block font-light md:text-4xl text-2xl pr-2">搜尋結果</h2>
      <p class="inline-block md:text-lg text-sm text-primary">
        共有<span class="text-tag px-1">{{ SearchResult.length }}</span>筆
      </p>
    </div>
    <div class="grid md:grid-cols-4 grid-cols-1 md:gap-7">
      <Card :cardVers="SearchResult" />
    </div>
  </article>
  <article class="md:mb-20 mb-15" v-else>
    <h3 class="md:text-4xl text-2xl font-light mb-4">熱門主題</h3>
    <div class="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 md:gap-7 gap-4">
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button" v-for="theme in themeList" :key="theme.content">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" :src="imgUrl(theme.backdrop)" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {{ theme.content }}
        </span>
      </button>
    </div>
  </article>
</template>
