<script setup>
import { RouterView } from 'vue-router'
import { useGetDataStore } from '@/stores/useGetDataStore'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

// 取得資料
const getAPI = useGetDataStore()
getAPI.GetData('ScenicSpot')
getAPI.GetData('Activity')
getAPI.GetData('Restaurant')
</script>

<template>
  <main class="grow">
    <NavBar />

    <section class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
      <RouterView />
    </section>
  </main>

  <Footer />
</template>

<style>
  html, body, #app {
    height: 100%;
  }
  #app {
    display: flex;
    flex-direction: column;
  }
</style>