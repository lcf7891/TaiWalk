<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const toggleMenu = ref(false)

function btnChange() {
  toggleMenu.value = !toggleMenu.value
}
</script>

<template>
  <nav class="navbar">
    <RouterLink to="/">
      <img class="md:block hidden" src="@/assets/images/icon/Logo-desktop.svg" alt="desktop logo">
      <img class="md:hidden block" src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
    </RouterLink>
    <ul class="nav" :class="{'active': toggleMenu}">
      <li class="nav-brand">
        <RouterLink to="/">
          <img src="@/assets/images/icon/Logo-mobile.svg" alt="mobile logo">
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/scenicSpot">探索景點</RouterLink>
      </li>
      <li class="nav-item md:border-0 border-y border-light">
        <RouterLink class="nav-link" to="/activity">節慶活動</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/restaurant">品嚐美食</RouterLink>
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
