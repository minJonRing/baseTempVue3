import request from '@/request/index.js'

export function ajax(option) {
  const _option = {
    method: 'get',
    responseType: 'json',
    ...option
  }
  const {
    method,
    data
  } = _option
  if (['get', 'delete'].includes(method)) {
    _option.params = data
  }

  return request(_option)
}
