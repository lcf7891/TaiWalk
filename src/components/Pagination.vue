<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps(['outerData'])
const emits = defineEmits(['pushData'])

const originData = props.outerData
const numPerPage = 20
const currentPage = ref(1)
const totalPage = computed(() => Math.ceil(originData.length / numPerPage))
const pageStatus = ref({
  pervState: computed(() => currentPage.value === 1),
  nextState: computed(() => currentPage.value === totalPage.value),
  pageList: (val) => typeof(val) !== 'number'
})

const segmentedData = computed(() => {
  const resAry = []
  let startIdx = 0
  let endIdx = numPerPage
  for (let i = 0; i < totalPage.value; i += 1) {
    const item = originData.slice(startIdx, endIdx)
    resAry.push(item)
    startIdx += numPerPage
    endIdx += numPerPage
  }
  return resAry
})

function changePageNum(min, max) {
  const tempAry = []
  if (min !== 0) {
    min -= 1
    tempAry.push(1, '...')
  }
  while (min < max) {
    min += 1
    tempAry.push(min)
  }
  if (max % numPerPage === 0) {
    tempAry.push('...', totalPage.value)
  }
  return tempAry
}

const showPageNum = computed(() => {
  let resAry = []
  const idx =  Math.floor(currentPage.value / numPerPage)
  const maxPage = idx * numPerPage + numPerPage
  const minPage = maxPage - numPerPage

  if (idx === 0 && currentPage.value > 0) {
    resAry = changePageNum(minPage, numPerPage)
  } else if (idx !== 0 && currentPage.value <= totalPage.value) {
    if (maxPage > totalPage.value) {
      resAry = changePageNum(minPage, totalPage.value)
    } else {
      resAry = changePageNum(minPage, maxPage)
    }
  }
  return resAry
})

function changeCurrent(num) {
  currentPage.value = num
}

function prevBtn() {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}

function nextBtn() {
  if (currentPage.value < totalPage.value) {
    currentPage.value += 1
  }
}

onMounted(() => emits('pushData', segmentedData.value[currentPage.value - 1]))

watch(currentPage, (newPage, oldPage) => {
  if (newPage !== oldPage) {
    emits('pushData', segmentedData.value[currentPage.value - 1])
  }
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
