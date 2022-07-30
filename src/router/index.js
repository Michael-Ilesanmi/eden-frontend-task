import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/pets/IndexView.vue";
import DogDetails from "@/views/pets/DogDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "IndexView",
      component: IndexView,
    },
    {
      path: "/dog",
      name: "DogDetails",
      component: DogDetails,
    },
  ],
});

export default router;
