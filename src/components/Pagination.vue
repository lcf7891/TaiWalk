<script setup>
import { ref, computed, onMounted, watch, toRefs } from 'vue'
// 外層傳入資料
const props = defineProps(['outerData'])
const { outerData } = toRefs(props)
// 將資料傳給外層
const emits = defineEmits(['pushData'])
// 每頁數量
// const numPerPage = 20
const numPerPage = computed(() => {
  let num = 20
  const screenWidth = document.documentElement.clientWidth
  if (screenWidth < 640) {
    num = 5
  } else if (screenWidth < 1024) {
    num = 12
  } else {
    num = 20
  }
  return num
});
// 現在頁面
const currentPage = ref(1)
// 總頁數
const totalPage = computed(() => Math.ceil(outerData.value.length / numPerPage.value))
// 上一頁、下一頁，頁碼列狀態
const pageStatus = ref({
  pervState: computed(() => currentPage.value === 1),
  nextState: computed(() => currentPage.value === totalPage.value),
  pageList: (val) => typeof val !== 'number'
})
// 切分每頁資料
const segmentedData = computed(() => {
  const resAry = []
  let startIdx = 0
  let endIdx = numPerPage.value
  for (let i = 0; i < totalPage.value; i += 1) {
    const item = outerData.value.slice(startIdx, endIdx)
    resAry.push(item)
    startIdx += numPerPage.value
    endIdx += numPerPage.value
  }
  return resAry
})
// 換頁後頁碼轉換
function changePageNum(min, max) {
  const tempAry = []
  let minVal = min
  const maxVal = max
  if (minVal !== 0) {
    minVal -= 1
    tempAry.push(1, '...')
  }
  while (minVal < maxVal) {
    minVal += 1
    tempAry.push(minVal)
  }
  if (maxVal % numPerPage.value === 0) {
    tempAry.push('...', totalPage.value)
  }
  return tempAry
}
// 處理要渲染的頁碼
const showPageNum = computed(() => {
  let resAry = []
  const idx =  Math.floor(currentPage.value / numPerPage.value)
  const maxPage = idx * numPerPage.value + numPerPage.value
  const minPage = maxPage - numPerPage.value

  if (idx === 0 && currentPage.value > 0) {
    if (totalPage.value > numPerPage.value) {
      resAry = changePageNum(minPage, numPerPage.value);
    } else {
      resAry = changePageNum(minPage, totalPage.value);
    }
  } else if (idx !== 0 && currentPage.value <= totalPage.value) {
    if (maxPage > totalPage.value) {
      resAry = changePageNum(minPage, totalPage.value)
    } else {
      resAry = changePageNum(minPage, maxPage)
    }
  }
  return resAry
})
// 切換當前頁碼
function changeCurrent(num) {
  currentPage.value = num
}
// 切換上一頁
function prevBtn() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
// 切換下一頁
function nextBtn() {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1
  }
}
// 回傳要顯示的資料
onMounted(() => emits('pushData', segmentedData.value[currentPage.value - 1]))
// 依當前頁碼回傳資料
watch(currentPage, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    emits('pushData', segmentedData.value[currentPage.value - 1])
  }
})
// 改變資料後回傳新資料
watch(outerData, () => {
  emits('pushData', segmentedData.value[currentPage.value - 1])
})
</script>

<template>
  <section class="md:pt-20 md:mb-28 py-16">
    <ul class="pagination">
      <li class="page-item">
        <button class="page-btn page-arrow page-prev" type="button" :class="{'page-disabled': pageStatus.pervState}" :disabled="pageStatus.pervState" @click="prevBtn"></button>
      </li>
      <li class="page-item mx-1" v-for="num in showPageNum" :key="num">
        <button class="page-btn" :class="[{'active': currentPage === num}, {'page-disabled': pageStatus.pageList(num)}]" type="button" :disabled="pageStatus.pageList(num)" @click="changeCurrent(num)">
          {{ num }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-btn page-arrow page-next" type="button" :class="{'page-disabled': pageStatus.nextState}" :disabled="pageStatus.nextState" @click="nextBtn"></button>
      </li>
    </ul>
  </section>
</template>
