import request from '@/utils/request'

// 短信模板列表
export function getWxSms(data) {
    return request({
      url: 'https://eyeai.weinde.cn/newserver/apis/wx_sms',
      method: 'get',
      params: data
    })
  }