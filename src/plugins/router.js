import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"

const routes = [
  { path: '/', name: '', component: Home },
]

export default createRouter({
  history: import.meta.env.VITE_IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
  routes,
})