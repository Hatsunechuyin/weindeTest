import request from '@/utils/request'
// 获取角色列表
export function getRoles() {
  return request({
    url: 'https://eyeai.weinde.cn/newserver/apis/permission/role', // 假地址 自行替换
    method: 'get'
  })
}
// 添加角色接口
export function addRole(data) {
  console.log(data)
  return request({
    url: 'https://eyeai.weinde.cn/newserver/apis/permission/role', // 假地址 自行替换
    method: 'post',
    data
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  let url = 'https://eyeai.weinde.cn/newserver/apis/permission/role/'+id
  return request({
    url: url, // 假地址 自行替换
    method: 'get'
  })
}

// 删除角色
export function deleteRole(id) {
  let url = 'https://eyeai.weinde.cn/newserver/apis/permission/role/'+id
  return request({
    url: url, // 假地址 自行替换
    method: 'delete'
  })
}