<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSearchStore } from '@/stores/useSearchStore'

const toggleMenu = ref(false)

function btnChange() {
  toggleMenu.value = !toggleMenu.value
}
const searchStore = useSearchStore()
function pageClear() {
  searchStore.ResetData()
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/" @click="pageClear">
      <img class="md:block hidden" src="@/assets/images/icon/Logo-desktop.svg" alt="desktop logo">
      <img class="md:hidden block" src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
    </RouterLink>
    <ul class="nav" :class="{'active': toggleMenu}">
      <li class="nav-brand">
        <RouterLink to="/" @click="pageClear">
          <img src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/scenicSpot" @click="pageClear">探索景點</RouterLink>
      </li>
      <li class="nav-item md:border-0 border-y border-light">
        <RouterLink class="nav-link" to="/activity" @click="pageClear">節慶活動</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/restaurant" @click="pageClear">品嚐美食</RouterLink>
      </li>
    </ul>
    <button class="btn-mobile" :class="{'active': toggleMenu}" type="button" @click="btnChange">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
  <div class="nav-backdrop" v-show="toggleMenu"></div>
</template>
