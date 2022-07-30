<template>
  <div class="img__container" v-lazyload>
    <button class="loader" disabled>
      <svg class="w-12 h-12 mx-auto">
        <path
          fill="none"
          stroke="white"
          stroke-width="6"
          d="M20,0 a20,20 0 0,1 20,20"
        />
      </svg>
    </button>
    <img :data-src="source" alt="Dog" />
  </div>
</template>

<script setup>
import vLazyload from "@/directives/lazyload";
defineProps({
  source: String,
});
</script>

<style scoped>
.img__container {
  @apply bg-gray-300 flex items-center justify-center relative overflow-clip;
}
img {
  @apply hidden cursor-pointer hover:scale-105 transition ease-in-out min-w-full min-h-full md:w-40 md:h-40;
}
.loader {
  @apply animate-spin;
}
.loaded .loader {
  @apply hidden;
}
.loaded img {
  @apply block;
}
</style>
