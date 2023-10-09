import request from '@/utils/request'

export function getPicCode () {
  return request.get('/captcha/image')
}

export function getPhoneCode (captchaCode, captchaKey, mobile) {
  return request.post('/captcha/sendSmsCaptcha', {
    form:
        {
          captchaCode,
          captchaKey,
          mobile
        }
  })
}
export function userLogin (mobile, smsCode) {
  return request.post('/passport/login', {
    form: {
      mobile,
      smsCode,
      isParty: false,
      partyData: {}
    }
  })
}
