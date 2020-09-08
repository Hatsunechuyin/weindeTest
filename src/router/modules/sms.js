/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const smsRouter = {
  path: '/sms',
  component: Layout,
  redirect: '/sms/tenxun',
  alwaysShow: true,
  name: 'sms',
  meta: {
    title: '短信测试',
    icon: 'table'
  },
  children: [
    {
      path: 'tenxun',
      component: () => import('@/views/test/tenxunSMS'),
      name: 'tenxun',
      meta: { title: '腾讯短信管理测试' }
    }
  ]
}
export default smsRouter
