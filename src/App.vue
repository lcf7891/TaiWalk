<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import Navbar from '@/components/HomeNavigation.vue'
import FooterDiv from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()
// 重新整理導向首頁
if (route.name !== 'home') {
  router.replace({ path: '/' })
}
</script>

<template>
  <Navbar />

  <main class="grow">
    <section class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
      <RouterView />
    </section>
  </main>

  <FooterDiv />
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