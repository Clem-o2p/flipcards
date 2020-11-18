import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import "./assets/tailwind.css";
import "../node_modules/shepherd.js/dist/css/shepherd.css";
import "./assets/style.css";

import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.mount("#app");
