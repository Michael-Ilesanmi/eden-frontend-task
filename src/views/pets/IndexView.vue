<template>
  <main class="container py-16">
    <div class="grid md:grid-flow-col grid-flow-row">
      <h1 class="font-bold text-3xl">Dog App</h1>
      <form
        @submit.prevent="searchDogsByBreed()"
        class="place-self-end grid grid-flow-col"
      >
        <input
          type="text"
          name="breedName"
          id="breedName"
          v-model="breedName"
          placeholder="Search by breed..."
          class="py-2 px-4 bg-gray-100 text-black font-light rounded-md mr-2"
        />
        <button
          type="submit"
          class="rounded-md bg-gray-200 text-black font-medium px-4"
        >
          Search
        </button>
      </form>
    </div>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 my-8"
    >
      <DogImage
        v-for="dog in dogs"
        :key="dog"
        :source="dog"
        @click="storeCurrentDog(dog)"
      />
    </div>
  </main>
</template>
<script setup>
import DogImage from "@/components/DogImageComponent.vue";

import { computed, inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const $loading = inject("$loading");

const store = useStore();
const router = useRouter();

const breedName = ref("");
const availableBreeds = ref([]);

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

const searchDogsByBreed = async () => {
  const loading = $loading.show();
  const { data } = await axios.get(
    `https://dog.ceo/api/breed/${breedName.value}/images`
  );
  const dogs = data.message;
  storeDogs(dogs);
  loading.hide();
}

onMounted(async () => {
  if (!dogs.value) fetchAllDogs();
  const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
  availableBreeds.value = data.message;
});
</script>

<style></style>
