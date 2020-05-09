import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
// 状态码错误信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 发起请求前
axios.interceptors.request.use(
  config => {
    // qs转换
    if (config.method.toUpperCase() !== 'GET') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    Toast.fail('服务器繁忙')
    return Promise.reject(error)
  }
)
// 发起请求后
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error) {
      // 请求配置发生的错误
      if (error.response) {
        // 获取状态码
        const status = error.response.status
        const errortext = codeMessage[status] || error.response.statusText
        // 提示错误信息
        Toast.fail(errortext)
      } else {
        Toast.fail('服务器超时')
      }
    }
    return Promise.reject(error)
  }
)

export function http(_options) {
  const { url, data, params, method } = _options
  const orgId = 104 /** 渠道ID */
  const api_url = '/api/' + url
  let options = {
    ..._options,
    url: api_url,
    data: data || {},
    params: params || {},
    headers: { ..._options.headers }
  }
  if (method === 'get') {
    options.params.orgId = orgId
  } else {
    options.data.orgId = orgId
  }
  return new Promise((resolve, reject) => {
    axios.request(options).then(
      response => {
        resolve(response.data)
      },
      err => {
        reject(err)
      }
    )
  })
}
