import { createRouter, createWebHashHistory } from "vue-router";

// templates
import Index from "/src/views/Index.vue"
import Home from "/src/views/Home.vue"

// config routes
const routes = [
  {
    path: '', component: Index, children: [
      { path: '', component: Home },
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export default router;