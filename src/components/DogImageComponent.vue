<template>
  <figure v-lazyload>
    <img
      class="h-40 w-40 cursor-pointer hover:scale-105 transition ease-in-out"
      :data-src="source"
      alt="Dog"
    />
  </figure>
</template>

<script setup>
import vLazyload from "@/directives/lazyload";
defineProps({
  source: String,
});
</script>

<style scoped>
figure {
@apply bg-gray-400 w-fit;
}
</style>
