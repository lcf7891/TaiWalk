<script setup>
import { usePageChangeStore } from '@/stores/usePageChangeStore'

const props = defineProps(['cardVers'])
const pageStatus = usePageChangeStore()
</script>

<template>
  <section class="card-ver" v-for="item in props.cardVers" :key="item.ID">
    <img :src="item.Pictures[0].PictureUrl" :alt="item.Name" class="card-ver-img" v-if="item.Pictures.length > 0">
    <img src="@/assets/images/NoImage-1100x400.svg" alt="No Image" class="card-ver-img" v-else>
    <div class="relative p-2">
      <h4 class="card-title md:line-clamp-1">
        {{ item.Name }}
      </h4>
      <p class="card-text">
        <img class="md:block hidden mr-1"
              src="@/assets/images/icon/spot16.svg"
              alt="position spot">
        {{ item.City }}
        <button type="button" class="card-btn card-btn-ver" @click="pageStatus.toDetail(item)"></button>
      </p>
    </div>
  </section>
</template>