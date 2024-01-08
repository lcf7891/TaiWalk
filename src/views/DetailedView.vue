<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import Carousel from '@/components/Carousel.vue'
import CardVer from '@/components/CardVertical.vue'

const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)

const randomData = useRandomDataStore()

const { showDetail } = storeToRefs(usePageChangeStore())
const cardData = ref([])

// 現在類別的 tag 與 card 的資料載入
const isType = computed(() => {
  const type = showDetail.value.type
  let resClass = ''
  if (type === 'ScenicSpot') {
    cardData.value = randomData.ExtractRandomData(ScenicSpotData.value, 4)
    resClass = '探索景點'
  } else if (type === 'Activity') {
    cardData.value = randomData.ExtractRandomData(ActivityData.value, 4)
    resClass = '節慶活動'
  } else if (type === 'Restaurant') {
    cardData.value = randomData.ExtractRandomData(RestaurantData.value, 4)
    resClass = '品嚐美食'
  }
  return resClass
})
// 個別類別的 tag
const classList = computed(() => {
  const data = showDetail.value
  const keyAry = Object.keys(data)
  const classAry = keyAry.filter((item) => item.match(/^Class/))
  const tempAry = []
  if (classAry.length) {
    classAry.forEach((item) => {
      tempAry.push(data[item])
    })
  }
  return tempAry
})
// console.log(showDetail)
</script>

<template>
  <section class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" v-if="showDetail.Pictures.length > 0" />
  </section>
  <article class="mb-15">
    <h2 class="md:text-4xl text-2xl font-light md:mb-3 mb-2">
      {{ showDetail.Name }}
    </h2>
    <section class="flex md:mb-7 mb-4">
      <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2">
        # {{ isType }}
      </span>
      <template v-if="classList.length > 0">
        <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2" v-for="item in classList" :key="item">
          # {{ item }}
        </span>
      </template>
    </section>
    <section class="md:mb-16 mb-8">
      <h3 class="md:text-xl text-lg md:font-bold font-medium md:mb-3 mb-2">
        景點介紹：
      </h3>
      <p class="md:text-lg text-base md:font-light">
        {{ showDetail.DescriptionDetail }}
      </p>
    </section>
    <section class="grid md:grid-cols-2 grid-cols-1 md:gap-8 md:bg-transparent bg-info">
      <div>
        <table class="block bg-info md:p-8 px-4 py-8 md:rounded-xl rounded-none">
          <tr class="block md:mb-3 mb-2">
            <td class="md:text-xl text-lg font-bold">活動時間：</td>
            <td class="md:text-lg text-base">06:00-19:00</td>
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
        <span class="md:inline-block hidden -ml-[6px]">的景點</span>
      </h3>
      <button class="btn-arrow text-tertiary font-medium mr-2" type="button">查看更多</button>
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