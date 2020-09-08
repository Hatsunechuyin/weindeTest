import request from '@/utils/request'

// 获取权限列表
export function rocketTest(data) {
  return request({
    url: 'http://www.mkparanoia.tk/api/todo',
    method: 'get',
  })
}
