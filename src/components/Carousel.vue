<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { register } from 'swiper/element/bundle'
import { usePageChangeStore } from '@/stores/usePageChangeStore'

// 實體輪播套件
register()
// 傳進外部資料
const props = defineProps({
  showData: {
    type: Object,
  },
  home: {
    type: Boolean,
    default: false,
  },
})
// 輪播選項
const navigationControl = ref({
  prevEl: '.swiper-btn-prev',
  nextEl: '.swiper-btn-next',
})
const paginationControl = ref({
  clickable: true,
  dynamicBullets: true,
})
// 輪播資料
const propsData = ref(props.showData)
// 判斷是不是首頁
const isHome = ref(props.home)
// 載入資料狀態 Store
const pageStatus = usePageChangeStore()
const { showDetail } = storeToRefs(pageStatus)
</script>

<template>
  <swiper-container :navigation="navigationControl"
                    :pagination="paginationControl"
                    loop="true" autoplay-delay="5000"
                    v-if="isHome">
    <swiper-slide v-for="item in propsData" :key="item.ID">
      <img class="swiper-slide-backdrop" :src="item.Pictures[0].PictureUrl" :alt="item.Name">
      <button class="swiper-slide-link" type="button" @click="pageStatus.toDetail(item)">
        {{ item.City }} | {{ item.Name }}
      </button>
    </swiper-slide>
    <div slot="container-end">
      <div class="swiper-btn-prev"></div>
      <div class="swiper-btn-next"></div>
    </div>
  </swiper-container>
  <template v-else>
    <swiper-container :navigation="navigationControl"
                      :pagination="paginationControl"
                      loop="true" autoplay-delay="5000"
                      v-if="showDetail.Pictures.length > 1">
      <swiper-slide v-for="detail in showDetail.Pictures" :key="detail.ID">
        <img class="swiper-slide-backdrop" :src="detail.PictureUrl" :alt="detail.PictureDescription">
      </swiper-slide>
      <div slot="container-end">
        <div class="swiper-btn-prev"></div>
        <div class="swiper-btn-next"></div>
      </div>
    </swiper-container>
    <swiper-container v-else-if="showDetail.Pictures.length > 0">
      <swiper-slide>
        <img class="swiper-slide-backdrop" :src="showDetail.Pictures[0].PictureUrl" :alt="showDetail.Pictures[0].PictureDescription">
      </swiper-slide>
    </swiper-container>
  </template>
</template>
