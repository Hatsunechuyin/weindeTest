import request from '@/utils/request'

export function getAccessList(params) {
  return request({
    url: 'https://eyeai.weinde.cn/newserver/apis/permission/access', // 假地址 自行替换
    method: 'get',
    params: {params},
  })
}