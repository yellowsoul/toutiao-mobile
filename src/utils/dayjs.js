/**
 * 封装自定义 dayjs 日期处理模块
 */
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// dayjs 默认语言是英文，我们这里配置中文
// 全局使用中文
dayjs.locale('zh-cn')

// dayjs() 获取当前最新时间
console.log(dayjs().format('YYYY-MM-DD'))
