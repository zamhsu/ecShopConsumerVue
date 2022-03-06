import { createApp } from "vue";

import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import App from "./App.vue"
import router from "./router";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const app = createApp(App);
app.use(Loading);
app.component("Loading", Loading);
app.use(router);
app.mount("#app");