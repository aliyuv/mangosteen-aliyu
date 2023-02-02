import { createApp } from 'vue'
import { App } from './App'
import { Bar } from './views/Bar'
import { Foo } from './views/Foo'
import { createRouter, createWebHashHistory } from 'vue-router'

// 定义路由
const routes = [
    { path: '/', component: Foo },
    { path: '/bar', component: Bar },
  ]

// 路由器
const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  
const app = createApp(App)
app.use(router)
app.mount('#app')