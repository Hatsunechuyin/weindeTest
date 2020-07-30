import request from '@/utils/request'
// 获取测试的api 配置
import CONFIG from './config'
// 获取权限列表
export function getAccessList(data) {
  return request({
    url: CONFIG.BASE_API + '/permission/access',
    method: 'get',
    params: data,
  })
}

// 添加权限接口
export function addAccess(data) {
  return request({
    url: CONFIG.BASE_API + '/permission/access',
    method: 'post',
    data
  })
}

// 删除权限
export function deleteAccess(id) {
  let url = CONFIG.BASE_API + '/api/permission/access/'+id
  return request({
    url: url, 
    method: 'delete'
  })
}

// 编辑权限
export function eidtAccess(id, data) {
  let url = 'https://eyeai.weinde.cn/covid-19/api/permission/access/'+id
  return request({
    url: url, 
    method: 'patch',
    data
  })
}