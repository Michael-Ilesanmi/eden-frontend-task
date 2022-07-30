<template>
  <main class="container py-16">
    <h1 class="font-bold text-3xl">Dog App</h1>
    <div
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 my-8 p-4"
    >
      <DogImage
        v-for="(dog, index) in dogs"
        :key="index"
        :source="dog"
        @click="storeCurrentDog(dog)"
      />
    </div>
  </main>
</template>
<script setup>
import DogImage from "@/components/DogImageComponent.vue";

import { computed, inject, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const $loading = inject("$loading");

const store = useStore();
const router = useRouter();

const dogs = computed(() => {
  return store.state.allDogs;
});

const storeCurrentDog = (dog) => {
  store.dispatch("storeCurrentDog", dog);
  router.push({ name: "DogDetails" });
};

const storeDogs = (dogs) => store.dispatch("storeDogs", dogs);

const fetchDogs = async () => {
  const { data } = await axios.get(
    "https://dog.ceo/api/breeds/image/random/50"
  );
  return data.message;
};

const fetchAllDogs = async () => {
  const loading = $loading.show();
  const dogRes1 = await fetchDogs();
  const dogRes2 = await fetchDogs();
  const dogs = Object.assign(dogRes1, dogRes2);
  storeDogs(dogs);
  loading.hide();
};

onMounted(() => {
  if (!dogs.value) fetchAllDogs();
});
</script>

<style></style>
