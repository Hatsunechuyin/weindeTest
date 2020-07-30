import request from '@/utils/request'
import axios from 'axios'
// 短信模板列表
export function webLogin(data) {
  var url = 'https://eyeai.weinde.cn/newserver/apis/auth/web/login?login_type=' + data['login_type']
  return axios.post(
    url,
    {
      'password': data['password'],
      'phone': data['username']
    }
  )
}
