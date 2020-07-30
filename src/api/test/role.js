import request from '@/utils/request'
// 获取测试的api 配置
import CONFIG from './config'
// 获取角色列表
export function getRoles(data) {
  return request({
    url: CONFIG.BASE_API + '/permission/role',
    method: 'get',
    params: data
  })
}
// 添加角色接口
export function addRole(data) {
  return request({
    url: CONFIG.BASE_API + '/permission/role',
    method: 'post',
    data
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  var url = CONFIG.BASE_API + '/permission/role/' + id
  return request({
    url: url,
    method: 'get'
  })
}

// 删除角色
export function deleteRole(id) {
  var url = CONFIG.BASE_API + '/permission/role/' + id
  return request({
    url: url,
    method: 'delete'
  })
}

// 修改角色信息
export function editRole(id, data) {
  var url = CONFIG.BASE_API + '/permission/role/' + id
  return request({
    url: url,
    method: 'put',
    data
  })
}
