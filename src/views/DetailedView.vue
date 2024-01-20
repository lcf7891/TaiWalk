<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import { useSearchStore } from '@/stores/useSearchStore'
// import Breadcrumb from '@/stores/Breadcrumb.vue'
import Carousel from '@/components/Carousel.vue'
import CardVer from '@/components/CardVertical.vue'

// 取得起始資料
const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)
// 載入隨機方法
const randomData = useRandomDataStore()
// 取得頁面資訊
const pageStore = usePageChangeStore()
const { showDetail } = storeToRefs(pageStore)
const { Type, ID } = showDetail.value
// 判斷資訊
const showInfo = computed(() => {
  const obj = {}
  switch (Type) {
    case 'ScenicSpot':
      obj.ctType = '探索景點'
      obj.data = ScenicSpotData.value
      break
    case 'Activity':
      obj.ctType = '節慶活動'
      obj.data = ActivityData.value
      break
    case 'Restaurant':
      obj.ctType = '品嚐美食'
      obj.data = RestaurantData.value
      break
    default:
      console.error('資料錯誤：', Type)
      break
  }
  obj.subTitle = obj.ctType.split('').slice(2, 4).join('')
  return obj
})
// judgmentData()
const cardData = ref([])
const randomInfo = showInfo.value.data.filter(item => item.City === showDetail.value.City)
cardData.value = randomData.ExtractRandomData(randomInfo, 4)
watch(showDetail, () => {
  switch (ID) {
    default:
      cardData.value = randomData.ExtractRandomData(randomInfo, 4)
      break
  }
})
const searchStore = useSearchStore()
const router = useRouter()
function showMoreBtn() {
  const options = {
    pageStatus: Type,
    county: showDetail.value.City,
    keyWord: ''
  }
  searchStore.SearchInfo(options)
  const pageName = `/${Type}`
  router.push({
    path: pageName,
  })
}
// 置頂
router.afterEach(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <!-- <Breadcrumb /> -->
  <section class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </section>
  <article class="mb-15">
    <h2 class="md:text-4xl text-2xl font-light md:mb-3 mb-2">
      {{ showDetail.Name }}
    </h2>
    <section class="flex md:mb-7 mb-4">
      <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2">
        # {{ showInfo.ctType }}
      </span>
      <template v-if="showDetail.Class.length > 0">
        <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2" v-for="item in showDetail.Class" :key="item">
          # {{ item }}
        </span>
      </template>
    </section>
    <section class="md:mb-16 mb-8">
      <h3 class="md:text-xl text-lg md:font-bold font-medium md:mb-3 mb-2">
        景點介紹：
      </h3>
      <p class="md:text-lg text-base md:font-light">
        {{ showDetail.Description }}
      </p>
    </section>
    <section class="grid md:grid-cols-2 grid-cols-1 md:gap-8 md:bg-transparent bg-info">
      <div>
        <table class="block bg-info md:p-8 px-4 py-8 md:rounded-xl rounded-none">
          <tr class="block md:mb-3 mb-2">
            <td class="md:text-xl text-lg font-bold">
              活動時間：
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.StartTime }}
            </td>
            <td class="md:text-lg text-base">{{ showDetail.OpenTime }}</td>
          </tr>
          <tr class="block md:mb-3 mb-2">
            <td class="md:text-xl text-lg font-bold">聯絡電話：</td>
            <td class="md:text-lg text-base">886-3-9545114</td>
          </tr>
          <tr class="block md:mb-3 mb-2">
            <td class="md:text-xl text-lg font-bold">主辦單位：</td>
            <td class="md:text-lg text-base">宜蘭縣265羅東鎮中正北路118號</td>
          </tr>
        </table>
      </div>
      <aside>
        <div class="map md:mb-8 mb-5"></div>
        <h4 class="md:text-xl text-lg font-bold mb-5">周邊資訊：</h4>
        <div class="grid md:grid-cols-3 grid-cols-1 md:gap-x-7 md:gap-y-0 gap-y-2">
          <button class="btn-spot" type="button"></button>
          <button class="btn-activity" type="button"></button>
          <button class="btn-cuisine" type="button"></button>
        </div>
      </aside>
    </section>
  </article>
  <article class="md:mb-28 md:pb-2 mb-15">
    <section class="flex justify-between items-center w-full md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">
        還有這些不能錯過
        <span class="md:inline-block hidden -ml-[6px]">
          的{{ showInfo.subTitle }}
        </span>
      </h3>
      <button class="btn-arrow text-tertiary font-medium mr-2" type="button" @click="showMoreBtn">
        更多{{ showDetail.City }}{{ showInfo.subTitle }}
      </button>
    </section>
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <CardVer :cardVers="cardData" />
    </section>
  </article>
</template>

<style lang="postcss" scoped>
  .map {
    height: 270px;
    @apply w-full bg-info rounded-xl;
  }
</style>