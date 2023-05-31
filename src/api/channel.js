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

/**
 * 添加频道列表
 */

export const addUserChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}
