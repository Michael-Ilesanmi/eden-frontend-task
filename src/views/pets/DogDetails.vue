<template>
  <main>
    <div class="container">
      <div
        class="grid grid-flow-row md:grid-flow-col gap-8 md:gap-16 my-12 justify-start"
      >
        <div class="h-72 w-72 overflow-clip">
          <figure v-lazyload>
            <img class="cursor-pointer" :data-src="dog" alt="Dog" />
          </figure>
        </div>
        <div class="space-y-4">
          <h1 class="font-semibold text-2xl">Dog Details</h1>
          <p class="text-xl font-semibold">Lorem ipsum dolor.</p>
          <p class="text-sm md:w-4/6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            minima! Quisquam aperiam tempora voluptate fugiat animi recusandae
            aspernatur ratione porro suscipit doloremque deserunt, ex
            voluptates!
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import vLazyload from "@/directives/lazyload";

const store = useStore();
const router = useRouter();

const dog = computed(() => {
  return store.state.currentDog;
});

onMounted(() => {
  if (!dog.value) return router.push({ name: "IndexView" });
});
</script>

<style scoped>
figure {
  @apply bg-gray-400;
}
</style>
