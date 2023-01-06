import { ajax } from '@/api/ajax.js';

import {
  fnArrFlat,
  fnArrToJson
} from 'tqr'

// 字典名称
export const zdName = 'zd'

// 获取字典的方法
export const getZd = (state, attr, option = {}) => {
  const _option = {
    base: '/learning/api',
    key: 'value',
    value: 'code',
    children: 'children',
    ...option
  }
  const {
    base,
    url,
    json
  } = _option
  let param = state[zdName][attr];
  if (param && param.length === 0) {
    ajax({
      url: `${base}${url}`,
    }).then(({
      data
    }) => {
      if (data && data.length) {
        const list = fnArrFlat(data, _option)
        state[zdName][attr] = list
        json ? state[zdName][json] = fnArrToJson(list) : {}

      } else {
        state[zdName][attr] = [{
          value: null,
          label: '数据加载失败，请联系管理员'
        }]
      }

    }).catch(() => { })
  }
  return param
}
// 生成state
export const generateState = (store) => {
  const states = {}
  const keys = Object.keys(store)
  for (const i in keys) {
    const key = keys[i]
    const {
      initValue,
      type
    } = store[key]
    if (type === 'get') {
      states[key] = {}
    } else {
      states[key] = initValue
    }
  }
  return states
}

// 生成getters
export const generateGetters = (store) => {
  const getters = {}
  const keys = Object.keys(store)
  for (const i in keys) {
    const key = keys[i]
    const {
      option,
      type
    } = store[key]
    if (type === 'get') {
      getters[key] = state => state[zdName][key]
    } else {
      getters[key] = state => getZd(state, key, option)
    }
  }
  return getters
}
