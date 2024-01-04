<script setup>
import { ref, computed } from 'vue'
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
const propsData = ref([])
propsData.value = props.showData
// 判斷是不是首頁
const isHome = ref(false)
isHome.value = props.home

// 載入資料狀態 Store
const pageStatus = usePageChangeStore()
const { showDetail } = storeToRefs(pageStatus)
// 判斷在詳細介紹時要顯示的圖片量
const detailState = computed(() => showDetail.value.Pictures.length > 1)
</script>

<template>
  <swiper-container :navigation="navigationControl"
                    :pagination="paginationControl"
                    loop="true" autoplay-delay="5000"
                    v-if="isHome">
    <swiper-slide v-for="item in propsData" :key="item.ID">
      <img class="swiper-slide-backdrop" :src="item.Picture.PictureUrl1" :alt="item.Name">
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
                      v-if="detailState">
      <swiper-slide v-for="detail in showDetail.Pictures" :key="detail.ID">
        <img class="swiper-slide-backdrop" :src="detail.PictureUrl" :alt="detail.PictureDescription">
      </swiper-slide>
      <div slot="container-end">
        <div class="swiper-btn-prev"></div>
        <div class="swiper-btn-next"></div>
      </div>
    </swiper-container>
    <swiper-container v-else>
      <swiper-slide>
        <img class="swiper-slide-backdrop" :src="showDetail.Picture.PictureUrl1" :alt="showDetail.Picture.PictureDescription1">
      </swiper-slide>
    </swiper-container>
  </template>
</template>
