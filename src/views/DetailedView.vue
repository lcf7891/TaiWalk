<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import Carousel from '@/components/Carousel.vue'

const { showDetail } = storeToRefs(usePageChangeStore())
const isType = computed(() => {
  const type = showDetail.value.type
  let resClass = ''
  if (type === 'ScenicSpot') {
    resClass = '探索景點'
  } else if (type === 'Activity') {
    resClass = '節慶活動'
  } else if (type === 'Restaurant') {
    resClass = '品嚐美食'
  }
  return resClass
})

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
console.log(showDetail)
</script>

<template>
  <div class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </div>
  <article class="md:mb-15">
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
    <section class="grid md:grid-cols-2 grid-cols-1 gap-8">
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
    </section>
  </article>
</template>
