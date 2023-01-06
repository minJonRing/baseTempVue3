import { generateState, generateGetters } from './fn'
// 字典名称

// 字典集合
export const store = {

  // 学历
  eduList: {
    initValue: [],
    option: { url: '/edu/list', key: 'eduName', value: 'eduCode' },
  },
}

// state getters
const state = generateState(store)
const getters = generateGetters(store)
// 导出
export {
  getters,
  state
}