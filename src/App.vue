<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const route = useRoute()
const router = useRouter()
// 重新整理導向首頁
if (route.name !== 'home') {
  router.replace({ path: '/' })
}
</script>

<template>
  <NavBar ref="navEl" />

  <main class="grow" ref="mainEl">
    <section class="container mx-auto md:pb-12 pb-6 px-4 mb-auto">
      <RouterView />
    </section>
  </main>

  <Footer ref="fEl" />
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