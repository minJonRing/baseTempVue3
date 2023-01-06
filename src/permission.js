import router from '@/router/index.js'
import store from '@/store/index.js'
import { toRaw } from '@vue/reactivity'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from '@/utils/auth.js' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login', '/forgot', '/register'] // no redirect whitelist

const handleAddRoute = (route, _name) => {
  for (let el of route) {
    const { name, children } = el
    if (_name) {
      router.addRoute(_name, el)
      if (children) {
        handleAddRoute(children, name)
      }
    } else {
      router.addRoute(el)
    }
  }
}


router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page  91330100716105852A
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const roles = toRaw(store.getters.roles)
      const hasRoles = roles && roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          const { menuList } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', menuList || [])
          // router.addRoutes(accessRoutes)
          handleAddRoute(accessRoutes)
          console.log(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
