<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useZipCodeStore } from '@/stores/useZipCodeStore'
import { useGetDataStore } from '@/stores/useGetDataStore'
import Breadcrumb from '@/components/BreadCrumb.vue'

const getAPI = useGetDataStore()
// 動態圖片路徑
const themeList = ref([
  {
    content: '地方特產',
    backdrop: 'Theme-bg3-1.svg'
  },
  {
    content: '中式美食',
    backdrop: 'Theme-bg3-2.svg'
  },
  {
    content: '甜點冰品',
    backdrop: 'Theme-bg3-3.svg'
  },
  {
    content: '異國料理',
    backdrop: 'Theme-bg3-4.svg'
  },
  {
    content: '伴手禮',
    backdrop: 'Theme-bg3-5.svg'
  },
  {
    content: '素食',
    backdrop: 'Theme-bg3-6.svg'
  },
])
function imgUrl(url) {
  return getAPI.GetImgUrl(url)
}
// 渲染縣市選項
const zipCode = useZipCodeStore()
const { cityName } = storeToRefs(zipCode)
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
      <input class="h-full md:mb-0 mb-2" type="text" name="SearchKey" id="SearchKey" placeholder="你想吃什麼？請輸入關鍵字">
    </label>
    <button class="md:col-span-2 btn-search w-full" type="button">
      <img src="@/assets/images/icon/search30.svg" alt="search icon">
      搜尋
    </button>
  </form>
  <article class="md:mb-20 mb-15">
    <h3 class="md:text-4xl text-2xl font-light mb-4">熱門分類</h3>
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
