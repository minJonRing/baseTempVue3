import { state as globalState } from '../global/index'
import { state as userState } from '@/modules/aUser/store/index'

const state = {
  // 地区
  ...globalState,
  // 用户
  ...userState,
}
export default {
  namespaced: true,
  state,
}