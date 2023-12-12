<script setup>
import { ref } from 'vue'

const props = defineProps(['cardHors'])
const showData = ref([])

function timeFormat(time) {
  return time.split('T')[0].split('-').join('/')
}

function ReorganizeData() {
  showData.value = props.cardHors.map(item => {
    item.StartTime = timeFormat(item.StartTime)
    item.EndTime = timeFormat(item.EndTime)
    return item
  })
}
ReorganizeData()
console.log(showData.value)
</script>

<template>
  <section class="card-hor" v-for="item in showData" :key="item.ActivityID">
    <img :src="item.Picture.PictureUrl1" :alt="item.ActivityName" class="card-hor-img" v-if="Object.hasOwn(item.Picture, 'PictureUrl1')">
    <img src="@/assets/images/NoImage-1100x400.svg" alt="No Image" class="card-hor-img" v-else>
    <div class="card-hor-body">
      <span class="card-subtitle">{{ item.StartTime }} - {{ item.EndTime }}</span>
      <h4 class="card-title">
        {{ item.ActivityName }}
      </h4>
      <div class="card-footer">
        <p class="card-text">
          <img class="md:block hidden mr-1"
                src="@/assets/images/icon/spot16.svg"
                alt="position spot">
          {{ item.City }}
        </p>
        <button class="card-btn card-btn-hor btn-arrow" type="button">詳細介紹</button>
      </div>
    </div>
  </section>
</template>