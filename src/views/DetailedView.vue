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
</script>

<template>
  <div class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </div>
  <article class="md:mb-15">
    <h2 class="md:text-4xl text-2xl font-light md:mb-3 mb-2">
      {{ showDetail.Name }}
    </h2>
    <div class="flex">
      <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2">
        # {{ isType }}
      </span>
      <template v-if="classList.length > 0">
        <span class="text-tag hover:text-primary md:text-xl text-sm border border-tag hover:border-primary rounded-[20px] py-1 px-4 mr-2" v-for="item in classList" :key="item">
          # {{ item }}
        </span>
      </template>
    </div>
  </article>
</template>
