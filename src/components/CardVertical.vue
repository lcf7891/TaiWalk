<script setup>
const props = defineProps(['cardVers'])
</script>

<template>
  <section class="card-ver" v-for="item in props.cardVers" :key="item.ID">
    <img :src="item.Picture.PictureUrl1" :alt="item.name" class="card-ver-img" v-if="Object.hasOwn(item.Picture, 'PictureUrl1')">
    <img src="@/assets/images/NoImage-1100x400.svg" alt="No Image" class="card-hor-img" v-else>
    <div class="relative p-2">
      <h4 class="card-title md:line-clamp-1">
        {{ item.name }}
      </h4>
      <p class="card-text">
        <img class="md:block hidden mr-1"
              src="@/assets/images/icon/spot16.svg"
              alt="position spot">
        {{ item.City }}
        <button type="button" class="card-btn card-btn-ver"></button>
      </p>
    </div>
  </section>
</template>