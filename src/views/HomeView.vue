<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRouter } from 'vue-router'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import { useSearchStore } from '@/stores/useSearchStore'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import Carousel from '@/components/Carousel.vue'
import CardHor from '@/components/CardHorizontal.vue'
import CardVer from '@/components/CardVertical.vue'

// 取得資料
const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)
getAPI.GetData('ScenicSpot')
getAPI.GetData('Activity')
getAPI.GetData('Restaurant')

// 生成隨機資料
const randomData = useRandomDataStore()

// 監聽景點資料
const carouselData = ref([])
const horCardData = ref([])
watch(ScenicSpotData, (newQ) => {
  if (newQ.length > 0) {
    const imgData = randomData.FilterNoPictures(newQ)
    carouselData.value = randomData.ExtractRandomData(imgData, 6)
    spotVerCardData.value = randomData.ExtractRandomData(imgData, 4)
    console.log('ScenicSpot', ScenicSpotData.value)
  }
})

// 監聽活動資料
const spotVerCardData = ref([])
watch(ActivityData, (newQ) => {
  if (newQ.length > 0) {
    const timeData = randomData.RemoveSpecifiedDate(newQ)
    const randomAry = randomData.ExtractRandomData(timeData, 4)
    horCardData.value = randomData.TimeFormat(randomAry)
    console.log('Activity', ActivityData.value)
  }
})

// 監聽餐飲資料
const cateringCardData = ref([])
watch(RestaurantData, (newQ) => {
  if (newQ.length > 0) {
    cateringCardData.value = randomData.ExtractRandomData(newQ, 4)
  }
})

// 使用者查詢資訊
const router = useRouter()
const SearchData = useSearchStore()
// 使用者輸入資料
const userForm = ref({
  select: 'scenicSpot',
  keyWord: '',
})
function searchBtn() {
  // 搜尋資料
  SearchData.SearchInfo(userForm.value)
  // 依選擇換頁
  router.push(`/${userForm.value.select}`)
}

const pageState = usePageChangeStore()
function toDetail(item) {
  pageState.DetermineStatus(item)
  router.push({
    path: '/detailed'
  })
}
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
          <select class="mb-2" name="SearchOptions" id="SearchOptions" v-model="userForm.select">
            <option value="scenicSpot">探索景點</option>
            <option value="activity">節慶活動</option>
            <option value="restaurant">品嚐美食</option>
          </select>
        </label>
        <label for="SearchKey">
          <input class="mb-2" type="text" name="SearchKey" id="SearchKey" placeholder="你想去哪裡？請輸入關鍵字" v-model="userForm.keyWord">
        </label>
        <button class="btn-search w-full" type="button" @click.prevent="searchBtn">
          <img src="@/assets/images/icon/search30.svg" alt="search icon">
          搜尋
        </button>
      </form>
    </div>
  </header>
  <!-- 輪播 -->
  <article class="md:mb-9 mb-6">
    <Carousel :showData="carouselData" :home="true" v-if="carouselData.length > 0"></Carousel>
  </article>
  
  <!-- 活動 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">近期活動</h3>
      <RouterLink class="btn-arrow text-tertiary font-medium mr-2" to="/activity">查看更多活動</RouterLink>
    </div>
    <!-- 橫式卡 -->
    <section class="grid lg:grid-cols-2 grid-cols-1 lg:gap-y-3 lg:gap-x-7 gap-y-4 mb-9">
      <CardHor :cardHors="horCardData"></CardHor>
    </section>
  </article>
  
  <!-- 景點 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">熱門景點</h3>
      <RouterLink class="btn-arrow text-tertiary font-medium mr-2" to="/scenicSpot">查看更多景點</RouterLink>
    </div>
    <!-- 直式卡 -->
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <CardVer :cardVers="spotVerCardData"></CardVer>
    </section>
  </article>

  <!-- 美食 -->
  <article class="mb-9">
    <div class="flex justify-between items-center md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">味蕾狂熱美食</h3>
      <RouterLink class="btn-arrow text-tertiary font-medium mr-2" to="/restaurant">查看更多美食</RouterLink>
    </div>
    <!-- 直式卡 -->
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <CardVer :cardVers="cateringCardData"></CardVer>
    </section>
  </article>
</template>
