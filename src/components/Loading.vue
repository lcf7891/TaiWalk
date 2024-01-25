<template>
  <section class="wrap">
    <div class="loader">
      <span style="--i:1;"></span>
      <span style="--i:2;"></span>
      <span style="--i:3;"></span>
      <span style="--i:4;"></span>
      <span style="--i:5;"></span>
      <span style="--i:6;"></span>
      <span style="--i:7;"></span>
      <span style="--i:8;"></span>
      <span style="--i:9;"></span>
      <span style="--i:10;"></span>
    </div>
  </section>
</template>

<style lang="postcss" scoped>
.wrap {
  @apply flex justify-center items-center w-full h-full animate-rotateCircle;
}
.loader {
  @apply relative w-14 h-14;
}
.loader span {
  @apply absolute top-0 left-0 w-full h-full;
  transform: rotate(calc(36deg * var(--i)));
}
.loader span::before {
  content: '';
  @apply absolute top-0 left-0 w-3 h-3 rounded-full bg-primary shadow-radiant  shadow-primary animate-elementScaling;
  animation-delay: calc(0.1s * var(--i));
}
</style>
