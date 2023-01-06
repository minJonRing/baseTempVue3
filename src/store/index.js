import Vuex from 'vuex'
import getters from './getters.js'

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = import.meta.globEager('./modules/*.js')

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = {}
for (const key in modulesFiles) {
  const filename = key.replace(/(\.\/modules\/|\.(js|ts))/g, "");
  modules[filename] = modulesFiles[key].default || modulesFiles[key];
}

// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})
const store = new Vuex.Store({
  modules,
  getters,
})

export default store
