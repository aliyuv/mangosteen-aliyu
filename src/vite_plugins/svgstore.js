import path from 'path'
import fs from 'fs'
import store from 'svgstore' // 用于制作svg sprites
import { optimize } from 'svgo' // 用于优化svg

export const svgstore = ( options = {} ) => {
  const inputFolder = options.inputFolder || 'src/assets/icon' 
  return {
    name: 'svgstore',
    resolveId(id) {
      if (id === '@svgstore') {
        return 'svg_bundle.js'
      }
    },
    load(id){
      if(id === 'svg_bundle.js'){
        const sprites = store(options) // create a new svgstore instance
        const iconDir = path.resolve(inputFolder) //read icon in folder 
        for (const file of fs.readdirSync(iconDir)){ // read all files in icon folder
            const filePath = path.join(iconDir, file) // get full file  path 
            const svgid = path.parse(file).name // get file name
            let code = fs.readFileSync(filePath, {encoding: 'utf-8'}) // read file content
            sprites.add(svgid,code) // add svg to sprites
        }
        const {data: code} = optimize(sprites.toString({ inline:options.inline}), {
          plugins: [
            'removeDoctype',
            'cleanupAttrs',
            'removeComments',
            'removeTitle',
            'removeDesc',
            'removeEmptyAttrs',
            {name: "removeAttrs", params: {attrs: "(data-name | data-xxx)"}}
          ]
        }) // optimize svg 
        return `const div = document.createElement('div')
        div.innerHTML = \`${code}\`
        const svg = div.getElementsByTagName('svg')[0]
        if( svg ){
          svg.style.position = 'absolute'
          svg.style.width = 0
          svg.style.height = 0
          svg.style.overflow = 'hidden'
          svg.setAttribute('aria-hidden', 'true') 
        }
        //listen dom ready event
        document.addEventListener('DOMContentLoaded', function() {
          if(document.body.firstChild){
            document.body.insertBefore(div, document.body.firstChild)
          }else{
            document.body.appendChild(div)
          }
        })`
      }
    }
  }
}
