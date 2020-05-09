import { http } from '../common/http'

export function getTodayFortune(params) {
  return http({
    method: 'get',
    url: '/Home/Kaiyun/indexData',
    params
  })
}
