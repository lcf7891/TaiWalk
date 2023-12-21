<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useZipCodeStore } from '@/stores/useZipCodeStore'
import { useGetDataStore } from '@/stores/useGetDataStore'
import Breadcrumb from '@/components/BreadCrumb.vue'

// 動態圖片路徑
const themeList = ref([
  {
    content: '節慶活動',
    backdrop: 'Theme-bg2-1.svg'
  },
  {
    content: '自行車活動',
    backdrop: 'Theme-bg2-2.svg'
  },
  {
    content: '遊憩活動',
    backdrop: 'Theme-bg2-3.svg'
  },
  {
    content: '產業文化活動',
    backdrop: 'Theme-bg2-4.svg'
  },
  {
    content: '年度活動',
    backdrop: 'Theme-bg2-5.svg'
  },
  {
    content: '四季活動',
    backdrop: 'Theme-bg2-6.svg'
  },
])
const { GetImgUrl } = useGetDataStore()
// 取得現在日期
const currentDate = ref(new Date().toISOString().split('T')[0])
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
    <label class="md:col-span-2 md:mb-0 mb-2" for="EventDate">
      <input class="h-full" type="date" name="EventDate" id="EventDate" :value="currentDate" :min="currentDate">
    </label>
    <label class="md:col-span-2 md:mb-0 mb-2" for="SearchKey">
      <input class="h-full" type="text" name="SearchKey" id="SearchKey" placeholder="想找有趣的？請輸入關鍵字">
    </label>
    <button class="md:col-span-2 btn-search w-full" type="button">
      <img src="@/assets/images/icon/search30.svg" alt="search icon">
      搜尋
    </button>
  </form>
  <article class="md:mb-40 mb-15">
    <h3 class="md:text-4xl text-2xl font-light mb-4">熱門主題</h3>
    <div class="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 md:gap-7 gap-4">
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button" v-for="theme in themeList" :key="theme.content">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" :src="GetImgUrl(theme.backdrop)" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {{ theme.content }}
        </span>
      </button>
    </div>
  </article>
</template>
