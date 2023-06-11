/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

/*
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
*/

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net', // 接口的基准路径
  // baseURL: 'http://ttapi.research.itcast.cn/'

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data // 如果后端返回的不是一个  标准格式 JSON 的字符串，就把原本的数据原封不动的返回
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return data; // axios 默认会在内部自动使用 JSON.parse 来转换后端的原始数据
    // return JSON.parse(data) // -> 大数字会有问题
  }]
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
