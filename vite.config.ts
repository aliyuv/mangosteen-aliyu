import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore} from "./src/vite_plugins/svgstore"
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import { devtools } from 'vue';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api/v1": {
        target: "http://121.196.236.94:3000/",
      }
    }
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()],
    }),
    devtools  
  ]
})
