import request from './request'

export function login(data) {
  return request({
    url: '/restaurant/barbecue/wechat/userLogin/getIndexRotationImage',
    method: 'POST',
    data,
  })
}
