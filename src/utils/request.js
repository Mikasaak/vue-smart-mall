import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 3000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  config.headers['Access-Token'] = store.getters.UserInfo.token
  config.platform = 'H5'
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  response = response.data
  if (response.status !== 200) {
    Toast(response.message)
    return Promise.reject(response.message)
  }
  Toast.clear()
  // if (response.status < 300) {
  //   Toast.success(response.message)
  // } else {
  //   Toast.fail(response.message)
  // }

  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  console.log('ssaas')
  return Promise.reject(error)
})
export default instance
