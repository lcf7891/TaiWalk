<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { useZipCodeStore } from '@/stores/useZipCodeStore'
import { useSearchStore } from '@/stores/useSearchStore'
import Breadcrumb from '@/components/BreadCrumb.vue'
import Card from '@/components/CardVertical.vue'
import Pagination from '@/components/Pagination.vue'

const getData = useGetDataStore()
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
// 渲染縣市選項
const zipCode = useZipCodeStore()
const { cityName } = storeToRefs(zipCode)
// 取得現在日期
const currentDate = ref(new Date().toISOString().split('T')[0])
// 使用者輸入資料
const userInput = ref({
  pageStatus: 'Activity',
  county: 'all',
  date: currentDate.value,
  keyWord: ''
})
// 載入搜尋結果
const searchStore = useSearchStore()
const { SearchResult } = storeToRefs(searchStore)
function searchBtn() {
  searchStore.SearchInfo(userInput.value)
  userInput.value.county = 'all'
  userInput.value.date = currentDate.value
  userInput.value.keyWord = ''
}
// 頁碼元件回傳資料
const pageData = ref([])
function callBack(data) {
  pageData.value = data
}
watch(pageData, (newQ) => {
  pageData.value = newQ
  window.scrollTo(0, 0)
})
</script>

<template>
  <Breadcrumb />
  <form class="grid md:grid-cols-8 md:gap-2 md:pt-2 md:pb-9 mb-4">
    <label class="md:col-span-2 md:mb-0 mb-2" for="SelectCounty">
      <select class="h-full" name="SelectCounty" id="SelectCounty" v-model="userInput.county">
        <option value="all">全部縣市</option>
        <option :value="city.ctName" v-for="city in cityName" :key="city.enName">
          {{ city.ctName }}
        </option>
      </select>
    </label>
    <label class="md:col-span-2 md:mb-0 mb-2" for="EventDate">
      <input class="h-full" type="date" name="EventDate" id="EventDate" :min="currentDate" v-model="userInput.date">
    </label>
    <label class="md:col-span-2 md:mb-0 mb-2" for="SearchKey">
      <input class="h-full" type="text" name="SearchKey" id="SearchKey" placeholder="想找有趣的？請輸入關鍵字">
    </label>
    <button class="md:col-span-2 btn-search w-full" type="button" @click="searchBtn">
      <img src="@/assets/images/icon/search30.svg" alt="search icon">
      搜尋
    </button>
  </form>
  <article class="md:mb-40 mb-15" v-if="SearchResult.length > 0">
    <div class="md:mb-3 mb-2">
      <h2 class="inline-block font-light md:text-4xl text-2xl pr-2">搜尋結果</h2>
      <p class="inline-block md:text-lg text-sm text-primary">
        共有<span class="text-tag px-1">{{ SearchResult.length }}</span>筆
      </p>
    </div>
    <div class="grid md:grid-cols-4 grid-cols-1 md:gap-7">
      <Card :cardVers="pageData" />
    </div>
    <Pagination :outerData="SearchResult" @pushData="callBack" />
  </article>
  <article class="md:mb-20 mb-15" v-else>
    <h3 class="md:text-4xl text-2xl font-light mb-4">熱門主題</h3>
    <div class="grid lg:grid-cols-8 md:grid-cols-4 grid-cols-2 md:gap-7 gap-4">
      <button class="md:col-span-2 col-span-1 relative md:text-2xl font-bold text-white" type="button" v-for="theme in themeList" :key="theme.content">
        <img class="w-full md:h-40 h-20 object-cover md:rounded-3xl rounded-2xl" :src="getData.GetImgUrl(theme.backdrop)" alt="Button background image">
        <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {{ theme.content }}
        </span>
      </button>
    </div>
  </article>
</template>
