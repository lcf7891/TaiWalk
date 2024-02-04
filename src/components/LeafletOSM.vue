<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePageChangeStore } from '../stores/usePageChangeStore'

const pageStore = usePageChangeStore()
const { showDetail } = storeToRefs(pageStore)

const mapRef = ref({})
function leafletOSM() {
  const tagName = showDetail.value.Name
  // 座標位置建立順序是固定
  const location = [
    // 緯度
    showDetail.value.Position.PositionLat,
    // 經度
    showDetail.value.Position.PositionLon,
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
  // L.icon
  const customIcon = L.icon({
  iconUrl: '/src/assets/images/icon/spot24_Y.svg',
  iconSize: [32, 32],
})
  // L.marker
  const marker = L.marker(location, {
    icon: customIcon,
  }).addTo(map)
  // 點擊位置才會顯示訊息框
  // 最後面加入 .openPopup() 會直接顯示
  marker.bindPopup(`<b>${tagName}</b>`).addTo(map).openPopup()
}
onMounted(() => leafletOSM())
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center" ref="mapRef"></div> 
</template>
