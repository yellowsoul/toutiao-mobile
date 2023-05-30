/**
 * 频道请求模块
 */

import request from '@/utils/request'

/**
 * 获取所有频道列表
 */

export const getAllchannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
