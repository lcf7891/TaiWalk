<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGetDataStore } from '@/stores/useGetDataStore'
import { usePageChangeStore } from '@/stores/usePageChangeStore'
import { useRandomDataStore } from '@/stores/useRandomDataStore'
import { useSearchStore } from '@/stores/useSearchStore'
import BreadCrumb from '@/components/Breadcrumb.vue'
import Carousel from '@/components/Carousel.vue'
import Card from '@/components/CardVertical.vue'

// 取得初始資料
const getAPI = useGetDataStore()
const { ScenicSpotData, ActivityData, RestaurantData } = storeToRefs(getAPI)

// 取得換頁資訊
const pageStroe = usePageChangeStore()
const { showDetail } = storeToRefs(pageStroe)
const { Type } = showDetail.value

// 資料動態轉換
const dynamicInfo = computed(() => {
  const obj = []
  switch (Type) {
    case 'ScenicSpot': 
      obj.ccType = '探索景點'
      obj.data = ScenicSpotData.value
      break
    case 'Activity':
      obj.ccType = '節慶活動'
      obj.data = ActivityData.value
      break
    case 'Restaurant':
      obj.ccType = '品嘗美食'
      obj.data = RestaurantData.value
      break
    default:
      console.error('資料錯誤：', Type)
      break
  }
  obj.subTitle = obj.ccType.split('').slice(2, 4).join('')
  return obj
})

// 取得隨資資料方法
const randomStore = useRandomDataStore()
// 卡片資料
const cardData = ref([])
// 篩選指定城市資料
const cityData = dynamicInfo.value.data.filter((item) => item.City === showDetail.value.City)
// 從城市資料隨機取得 4 筆顯示
cardData.value = randomStore.ExtractRandomData(cityData, 4)
watch(showDetail, () => {
  cardData.value = randomStore.ExtractRandomData(cityData, 4)
})

// 取得搜尋功能
const searchStore = useSearchStore()
// 取得路由方法
const router = useRouter()

// 相關資料按鈕
function detailBtn(type) {
  // 初始搜尋選項
  const options = {
    pageStatus: type,
    county: showDetail.value.City,
    keyWord: '',
  }
  // 放入搜尋
  searchStore.SearchInfo(options)
  const pageName = `/${type}`
  router.push({
    path: pageName,
  })
}

// 使用者位置
// function userPosition() {
//   const GPSsuccess = (position) => {
//     const lon = position.coords.longitude
//     const lat = position.coords.latitude
//     console.log(position)
//     console.log('GPSsuccess', lon, lat)
//     return {
//       lon,
//       // lat,
//     }
//   }
//   const GPSerror = (error) => {
//     alert(`ERROR(${error.code})：${error.message}`)
//   }
//   const GPSoptions = {
//     enableHighAccuracy: true,
//     maximumAge: 30000,
//     timeout: 10000,
//   }
//   if (!navigator.geolocation) {
//     alert('Geolocation is not supported by your browser')
//   } else {
//     navigator.geolocation.getCurrentPosition(
//       GPSsuccess,
//       GPSerror,
//       GPSoptions,
//     )
//   }
// }
// userPosition()
</script>

<template>
  <BreadCrumb>
    <li>
      <RouterLink class="md:text-base text-xs text-quinary hover:text-primary" :to="`/${Type}`">{{ dynamicInfo.ccType }}</RouterLink>
      <span class="text-primary mx-2">/</span>
    </li>
    <li>
      <button class="md:text-base text-xs text-quaternary hover:text-primary" type="button" @click="detailBtn(showDetail.Type)">
        {{ showDetail.City}}
      </button>
      <span class="text-primary mx-2">/</span>
    </li>
    <li>
      <p class="inline md:text-base text-xs text-primary">
        {{ showDetail.Name}}
      </p>
    </li>
  </BreadCrumb>
  <section class="md:mb-7 mb-4">
    <Carousel :showData="showDetail" />
  </section>
  <article class="mb-15">
    <h2 class="md:text-4xl text-2xl font-light md:mb-3 mb-2">
      {{ showDetail.Name }}
    </h2>
    <section class="flex md:mb-7 mb-4">
      <span class="text-tag hover:text-primary md:text-xl text-sm
            border border-tag hover:border-primary rounded-[20px]
            py-1 px-4 mr-2">
        # {{ dynamicInfo.ccType }}
      </span>
      <template v-if="showDetail.Class.length > 0">
        <span class="text-tag hover:text-primary md:text-xl text-sm
              border border-tag hover:border-primary rounded-[20px]
              py-1 px-4 mr-2"
              v-for="item in showDetail.Class"
              :key="item">
          # {{ item }}
        </span>
      </template>
    </section>
    <section class="md:mb-16 mb-8">
      <h3 class="md:text-xl text-lg md:font-bold font-medium md:mb-3 mb-2">
        {{ dynamicInfo.subTitle }}介紹：
      </h3>
      <p class="md:text-lg text-base md:font-light">
        {{ showDetail.Description }}
      </p>
    </section>
    <section class="grid md:grid-cols-2 grid-cols-1 md:gap-8 md:bg-transparent bg-info">
      <div class="inline-block">
        <table class="block bg-info md:p-8 px-4 py-8 md:rounded-xl rounded-none">
          <tr class="block md:mb-3 mb-2"
              v-if="showDetail.OpenTime ||
              showDetail.StartTime ||
              showDetail.EneTime">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">開放時間：</span>
              <span v-else-if="Type === 'Activity'">活動時間：</span>
              <span v-else-if="Type === 'Restaurant'">營業時間：</span>
            </td>
            <td class="md:text-lg text-base">
              <span v-if="Type === 'Activity'">
                {{ showDetail.StartTime }} ~ {{ showDetail.EndTime }}
              </span>
              <span v-else>{{ showDetail.OpenTime }}</span>
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.Phone">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">服務電話：</span>
              <span v-else>聯絡電話：</span>
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.Phone }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.Address">
            <td class="w-28 md:text-xl text-lg font-bold">
              <span v-if="Type === 'ScenicSpot'">景點地址：</span>
              <span v-else-if="Type === 'Activity'">活動地點：</span>
              <span v-else-if="Type === 'Restaurant'">餐廳地址：</span>
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.Address }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.Website">
            <td class="w-28 md:text-xl text-lg font-bold">
              官方網站：
            </td>
            <td class="md:text-lg text-base">
              <a class="text-quinary hover:text-secondary hover:underline"
                  :href="showDetail.Website"
                  target="_blank"
                  rel="noreferrer noopener">
                {{ showDetail.Website }}
              </a>
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.TicketInfo">
            <td class="w-28 md:text-xl text-lg font-bold">
              票價資訊：
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.TicketInfo }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.Remarks">
            <td class="w-28 md:text-xl text-lg font-bold">
              注意事項：
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.Remarks }}
            </td>
          </tr>
          <tr class="block md:mb-3 mb-2" v-if="showDetail.Organizer">
            <td class="w-28 md:text-xl text-lg font-bold">
              主辦單位：
            </td>
            <td class="md:text-lg text-base">
              {{ showDetail.Organizer }}
            </td>
          </tr>
        </table>
      </div>
      <aside>
        <div class="w-full h-72 bg-info rounded-xl md:mb-8 mb-5">
          <RouterView class="z-0" :key="showDetail.ID" />
        </div>
        <h4 class="md:text-xl text-lg font-bold mb-5">周邊資訊：</h4>
        <div class="grid md:grid-cols-3 grid-cols-1 md:gap-x-7 md:gap-y-0 gap-y-2">
          <button class="btn-spot" type="button" @click="detailBtn('ScenicSpot')"></button>
          <button class="btn-activity" type="button" @click="detailBtn('Activity')"></button>
          <button class="btn-cuisine" type="button" @click="detailBtn('Restaurant')"></button>
        </div>
      </aside>
    </section>
  </article>
  <article class="md:mb-28 md:pb-2 mb-15">
    <section class="flex justify-between items-center w-full md:mb-3 mb-2">
      <h3 class="md:text-4xl text-2xl font-light">
        還有這些不能錯過
        <span class="md:inline-block hidden -ml-[6px]">
          的{{ dynamicInfo.subTitle }}
        </span>
      </h3>
      <button class="btn-arrow text-tertiary font-medium mr-2" type="button" @click="detailBtn(`${Type}`)">
        更多{{ showDetail.City }}{{ dynamicInfo.subTitle }}
      </button>
    </section>
    <section class="grid lg:grid-cols-4 grid-cols-2 md:gap-x-7 gap-x-4 agp-y-4">
      <Card :cardVers="cardData" />
    </section>
  </article>
</template>
