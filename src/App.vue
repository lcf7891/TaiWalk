<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <NavBar />

  <main class="container mx-auto md:pb-12 pb-6 px-4">
    <RouterView />
  </main>
  
  <Footer />
</template>
