/**
 * 用户相关请求模块
 */
import request from '@/utils/request'

// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 获取短信验证码
 * 注意：接口限制了每个手机号每分钟1次
 */
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
