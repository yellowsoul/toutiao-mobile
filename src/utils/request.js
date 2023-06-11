/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const jsonStr = '{ "art_id": 1245953273786007552 }'

// JSON.parse()
console.log(JSON.parse(jsonStr)) // 1245953273786007600
// JSON.stringify()

// JSONBig 可以处理数据中超出 JavaScript 案全整数范围的问题
// JSONBig.parse() // 把 JSON 格式的字符串转为 JavaScript 对象
console.log(JSONBig.parse(jsonStr))

// 使用的时候需要把 BigNumber 类型的数据转为字符串来使用
console.log(JSONBig.parse(jsonStr).art_id.toString()) // 1245953273786007552

console.log(JSON.stringify(JSONBig.parse(jsonStr)))

// JSONBig.stringify() // 把 JavaScript 对象 转为 JSON 格式的字符串对象
console.log(JSONBig.stringify(JSONBig.parse(jsonStr)))

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 接口的基准路径
  // baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config 配置对象:本次请求的配置对象
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 注意:这里务必要返回 config 配置对象,否则请求就停在这里出不去了
  return config // 放行的标记
}, function (error) {
  // 如果请求出错了(还没有发出去)会进入这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
