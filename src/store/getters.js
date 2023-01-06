import { getters as globalGetters } from './global/index.js'
import { getters as userGetters } from '@/modules/aUser/store/index.js'

const getters = {
  // app
  sidebar: state => state.app.sidebar,
  // permission
  routes: state => state.permission.routes,
  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  // settings
  model: state => state.settings.model,
  // common
  loading: state => state.common.loading,
  // user
  token: state => state.user.token,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  // other
  ...globalGetters,
  ...userGetters
}

export default getters
