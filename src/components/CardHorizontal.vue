<script setup>
import { usePageChangeStore } from '@/stores/usePageChangeStore'

const props = defineProps(['cardHors'])
const pageStatus = usePageChangeStore()
</script>

<template>
  <section class="card-hor" v-for="item in props.cardHors" :key="item.ID">
    <img :src="item.Pictures[0].PictureUrl" :alt="item.Name" class="card-hor-img" v-if="item.Pictures.length > 0">
    <img src="@/assets/images/NoImage-1100x400.svg" alt="No Image" class="card-hor-img" v-else>
    <div class="card-hor-body">
      <div class="mb-auto">
        <span class="card-subtitle">{{ item.StartTime }} - {{ item.EndTime }}</span>
        <h4 class="card-title">
          {{ item.Name }}
        </h4>
      </div>
      <div class="card-footer">
        <p class="card-text">
          <img class="md:block hidden mr-1"
                src="@/assets/images/icon/spot16.svg"
                alt="position spot">
          {{ item.City }}
        </p>
        <button class="card-btn card-btn-hor btn-arrow" type="button" @click="pageStatus.toDetail(item)">詳細介紹</button>
      </div>
    </div>
  </section>
</template>