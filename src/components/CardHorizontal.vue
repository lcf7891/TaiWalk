<script setup>
const props = defineProps(['cardHors'])
</script>

<template>
  <section class="card-hor" v-for="item in props.cardHors" :key="item.ActivityID">
    <img :src="item.Picture.PictureUrl1" :alt="item.ActivityName" class="card-hor-img" v-if="item.showImg">
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