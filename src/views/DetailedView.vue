<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import { useSearchStore } from '@/stores/useSearchStore'
// import Breadcrumb from '@/stores/Breadcrumb.vue'
import Carousel from '@/components/Carousel.vue'
import Card from '@/components/CardVertical.vue'

// 取得起始資料
const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)
// 載入隨機方法
const randomData = useRandomDataStore()
// 取得頁面資訊
const pageStore = usePageChangeStore()
const { showDetail } = storeToRefs(pageStore)
const { ID, Type } = showDetail.value
// 判斷資訊
const cardData = ref([])
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
  obj.table = showDetail.value;
  obj.subTitle = obj.ctType.split('').slice(2, 4).join('')
  return obj
})
// 隨機卡片資料
const randomInfo = showInfo.value.data.filter(item => item.City === showDetail.value.City)
cardData.value = randomData.ExtractRandomData(randomInfo, 4)
watch(showDetail, () => {
  switch (ID) {
    default:
      cardData.value = randomData.ExtractRandomData(randomInfo, 4)
      break
  }
})
// 搜尋功能
const searchStore = useSearchStore()
const router = useRouter()
// 更多相關資料
function showMoreBtn() {
  // 建立選項
  const options = {
    pageStatus: Type,
    county: showDetail.value.City,
    keyWord: ''
  }
  // 放入搜尋
  searchStore.SearchInfo(options)
  const pageName = `/${Type}`
  router.push({
    path: pageName,
  })
}
// OSM + leaflet 地圖
const mapRef = ref({})
onMounted(() => {
  const tagName = showInfo.value.table.Name
  // 座標位置建立順序是固定
  const location = [
    // 緯度
    showInfo.value.table.Position.PositionLat,
    // 經度
    showInfo.value.table.Position.PositionLon,
  ]
  // L.map(指定DOM元素, 參數物件)
  const map = L.map(mapRef.value, {
    // 設定經緯度
    center: location,
    // 設定縮放
    zoom: 17,
  })
  // L.tileLayer - 建立圖資
  // {s}：圖磚請求的 subDomain 預設為 a、b、c
  // {z}：地圖的 zoom 等級
  // {x}: 圖磚的 x 座標
  // {y}: 圖磚的 y 座標
  // attribution 圖資版權設定
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)
  // 標記位置
  const marker = L.marker(location).addTo(map)
  // 點擊位置才會顯示訊息框
  // 最後面加入 .openPopup() 會直接顯示
  marker.bindPopup(`<b>${tagName}</b>`).addTo(map).openPopup()
})

// const DefaultCoordinates = {
//   lat: 23.4698799,
//   lon: 120.9572688,
//   n: 21,
// };

// const GPSoptions = {
//   // 精準定位
//   enableHighAccuracy: true,
//   maximumAge: 30000,
//   timeout: 10000,
// }
// function GPSsuccess(position) {
//   const lon = position.coords.longitude
//   const lat = position.coords.latitude
//   console.log('g', position)
//   console.log('nt', lon, lat)
// }
// function GPSerror(error) {
//   map.value.innerText = `使用者拒絕系統定位\n\n${error.message}`
//   console.log('err', error)
// }

// console.log(navigator.geolocation)

// if(!navigator.geolocation) {
//   map.value.innerText = '您的瀏覽器不支援系統定位\n\nGeolocation is not supported by your browse'
// } else {
//   navigator.geolocation.getCurrentPosition(
//     GPSsuccess,
//     GPSerror,
//     GPSoptions,
//   )
// }
// 置頂
router.afterEach(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <!-- <Breadcrumb /> -->
  <!-- 輪播 -->
  <section class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </section>
  <!-- 主要內容 -->
  <article class="mb-15">
    <h2 class="md:text-4xl text-2xl font-light md:mb-3 mb-2">
      {{ showDetail.Name }}
    </h2>
    <!-- 類別項目 -->
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
    <!-- 詳細描述 -->
    <section class="md:mb-16 mb-8">
      <h3 class="md:text-xl text-lg md:font-bold font-medium md:mb-3 mb-2">
        {{ showInfo.subTitle }}介紹：
      </h3>
      <p class="md:text-lg text-base md:font-light">
        {{ showDetail.Description }}
      </p>
    </section>
    <!-- 相關資訊 -->
    <section class="grid md:grid-cols-2 grid-cols-1 md:gap-8 md:bg-transparent bg-info">
      <div class="inline-block">
        <table class="block bg-info md:p-8 px-4 py-8 md:rounded-xl rounded-none">
          <tr class="block md:mb-3 mb-2"
              v-if="showInfo.table.OpenTime || showInfo.table.StartTime || showInfo.table.EneTime">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">開放時間：</span>
              <span v-else-if="Type === 'Activity'">活動時間：</span>
              <span v-else-if="Type === 'Restaurant'">營業時間：</span>
            </td>
            <td class="md:text-lg text-base">
              <span v-if="Type === 'Activity'">
                {{ showInfo.table.StartTime }} ~ {{ showInfo.table.EndTime }}
              </span>
              <span v-else>{{ showInfo.table.OpenTime }}</span>
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.Phone">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">服務電話：</span>
              <span v-else>聯絡電話：</span>
            </td>
            <td class="md:text-lg text-base">
              {{ showInfo.table.Phone }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.Address">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">景點地址：</span>
              <span v-else-if="Type === 'Activity'">活動地點：</span>
              <span v-else-if="Type === 'Restaurant'">餐廳地址：</span>
            </td>
            <td class="md:text-lg text-base">
              {{ showInfo.table.Address }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.Website">
            <td class="w-28 md:text-xl text-lg font-bold">
              官方網站：
            </td>
            <td class="md:text-lg text-base">
              <a class="text-quinary hover:text-secondary hover:underline" :href="showInfo.table.Website" target="_blank" rel="noreferrer noopener" :alt="Type">
                {{ showInfo.table.Website }}
              </a>
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.TicketInfo">
            <td class="w-28 md:text-xl text-lg font-bold">
              票價資訊：
            </td>
            <td class="md:text-lg text-base">
              {{ showInfo.table.TicketInfo }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.Remarks">
            <td class="w-28 md:text-xl text-lg font-bold">
              注意事項：
            </td>
            <td class="md:text-lg text-base">
              {{ showInfo.table.Remarks }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showInfo.table.Organizer">
            <td class="w-28 md:text-xl text-lg font-bold">
              主辦單位：
            </td>
            <td class="md:text-lg text-base">
              {{ showInfo.table.Organizer }}
            </td>
          </tr>
        </table>
      </div>
      <aside>
        <div class="map md:mb-8 mb-5">
          <div class="w-full h-full flex flex-col justify-center items-center text-center" ref="mapRef"></div>
        </div>
        <h4 class="md:text-xl text-lg font-bold mb-5">周邊資訊：</h4>
        <div class="grid md:grid-cols-3 grid-cols-1 md:gap-x-7 md:gap-y-0 gap-y-2">
          <button class="btn-spot" type="button"></button>
          <button class="btn-activity" type="button"></button>
          <button class="btn-cuisine" type="button"></button>
        </div>
      </aside>
    </section>
  </article>
  <!-- 更多介紹 -->
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
      <Card :cardVers="cardData" />
    </section>
  </article>
</template>

<style lang="postcss" scoped>
  .map {
    height: 270px;
    @apply w-full bg-info rounded-xl;
  }
</style>