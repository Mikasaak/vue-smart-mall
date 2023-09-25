import request from '@/utils/request'

export function getPicCode () {
  return request.get('/captcha/image')
}

export function getPhoneCode (data) {
  return request.post('/captcha/sendSmsCaptcha', data)
}
