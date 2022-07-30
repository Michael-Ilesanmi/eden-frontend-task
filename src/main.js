import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.css";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const app = createApp(App);

app.use(router).use(store).use(VueLoading, {
  isFullPage: true,
  loader: "dots",
  backgroundColor: "#00000",
  color: "#52A350",
});

app.mount("#app");
