import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJs from '@vitejs/plugin-vue-jsx'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',//ip地址
    port: 9999, // 设置服务启动端口号
    open: false,
    proxy: {
      "/api": {
        target: "http://org.ohras.cn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue(), vueJs()],
  resolve: {
    alias: {
      '@': path.resolve('./src') // @代替src
    }
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // '@import "assets/scss/globalVar.scss";@import "assets/scss/globalMixin.scss";'
  //       additionalData: '@import "../assets/scss/globalVar.scss";@import "../assets/scss/globalMixin.scss";'
  //     }
  //   }
  // },
})
