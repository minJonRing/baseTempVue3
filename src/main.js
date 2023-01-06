import { createApp } from 'vue'
import router from '@/router/index'
import store from '@/store/index'
import './style.css'
import App from './App.vue'
import './permission' // permission control

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { ajax } from '@/api/ajax'
const app = createApp(App)

app.config.globalProperties.$ajax = ajax

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus).use(store).use(router).mount('#app')
