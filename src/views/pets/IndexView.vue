<template>
  <main class="container py-16">
    <div class="grid grid-flow-row sm:grid-flow-col gap-8 items-center">
      <h1 class="font-bold text-3xl">Dog App</h1>
      <form @submit.prevent="searchDogsByBreed()" class="grid grid-flow-col">
        <VueAutosearch
          placeholder="Search by breed..."
          v-model="breedName"
          v-bind:options="breeds"
        />
        <button
          type="submit"
          class="rounded-md bg-gray-200 text-black font-medium px-4 ml-2"
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

import VueAutosearch from "vue-autosearch";

import { computed, inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

const $loading = inject("$loading");

const store = useStore();
const router = useRouter();

const breedName = ref({});

const dogs = computed(() => {
  return store.state.allDogs;
});

const breeds = computed(() => {
  return store.state.allBreeds;
});

const storeCurrentDog = (dog) => {
  store.dispatch("storeCurrentDog", dog);
  router.push({ name: "DogDetails" });
};

const storeDogs = (dogs) => store.dispatch("storeDogs", dogs);

const storeBreeds = (breeds) => store.dispatch("storeBreeds", breeds);

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
    `https://dog.ceo/api/breed/${breedName.value.name}/images`
  );
  const dogs = data.message;
  storeDogs(dogs);
  loading.hide();
};

onMounted(async () => {
  if (!dogs.value) fetchAllDogs();
  if (!breeds.value) {
    const { data } = await axios.get("https://dog.ceo/api/breeds/list/all");
    let i = 0;
    const breeds = [];
    Object.keys(data.message).forEach((element) => {
      let data = {};
      i++;
      data.id = i;
      data.name = element;
      breeds.push(data);
    });
    storeBreeds(breeds);
  }
});
</script>

<style src="vue-autosearch/dist/VueAutosearch.css"></style>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.autosearch__result::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.autosearch__result {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
