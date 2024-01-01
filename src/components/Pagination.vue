<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps(['dataList'])
const currentPage = ref(1)
const pagesAry = ref([])

function cutPages(data) {
  let startNum = 1
  const perPage = 20
  const resData = []
  while (startNum < data.length) {
    resData.push(data.slice(startNum, (startNum + perPage)))
    startNum += perPage
  }
  return resData
}
pagesAry.value = cutPages(props.dataList)
// // 渲染的資料
// const renderData = ref([])
// // 當前頁數
// const currentPage = ref(1)
// // 每頁資料量
// const perPage = 20
// // 總頁數
// const pageTotal = Math.ceil(props.dataList.length / perPage)
// // 切割資料
// function cutPages() {
//   // 最大索引值
//   const maxData = (currentPage.value * perPage)
//   // 最小索引值
//   const minData = maxData - perPage + 1
//   // 取得頁面資料
//   props.dataList.forEach((item, idx) => {
//     const runNum = idx + 1
//     if (runNum >= minData && runNum <= maxData) {
//       // 儲存到渲染陣列
//       renderData.value.push(item)
//     }
//   })
// }
// // 顯示頁碼
// const displayedPages = computed(() => {
//   const startPage = Math.max(1, currentPage.value - perPage)
//   const endPage = Math.min(pageTotal, startPage + perPage)
//   return Array.from({ length: endPage - startPage }, (_, index) => startPage + index)
// })
// cutPages()
// // 回上一頁
// function pagePrev() {
//   if (currentPage.value > 1) {
//     currentPage.value -= 1
//   }
// }
// // 往下一頁
// function pageNext() {
//   if (currentPage.value < pageTotal) {
//     currentPage.value += 1
//   }
// }
// // 切換目前頁碼
// function pageChange(page) {
//   currentPage.value = page
// }
// // 監聽現在頁數控制 prev、next 啟用與鎖定的狀態
// const prevState = ref(true)
// const nextState = ref(false)
// watch(currentPage, (newQ) => {
//   if (newQ <= 1) {
//     prevState.value = true
//   } else {
//     prevState.value = false
//   }
//   if (newQ >= pageTotal) {
//     nextState.value = true
//   } else {
//     nextState.value = false
//   }
// })
</script>

<template>
  <div>
    test
  </div>
</template>
<!-- <template>
  <section class="md:pt-20 md:mb-28 py-16">
    <ul class="pagination">
      <li class="page-item">
        <button class="page-btn page-arrow page-prev"
                :class="{'page-disabled': prevState}"
                type="button" @click="pagePrev"></button>
      </li>
      <li class="page-item mx-1"
          v-for="item, idx in displayedPages"
          :key="item.ID">
        <button class="page-btn" type="button" @click="pageChange(idx+1)">
          {{ idx + 1 }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-btn page-arrow page-next"
                :class="{'page-disabled': nextState}"
                type="button" @click="pageNext"></button>
      </li>
    </ul>
  </section>
</template> -->
