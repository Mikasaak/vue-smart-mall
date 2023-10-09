<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)"/>
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="phoneNumber">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="picCode">
          <img v-if="picBase64" :src="picBase64" alt="" @click="getPicCode">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="SmsCode">
          <button @click='getPhoneCode()' :disabled="timer">{{ !timer ? '获取验证码' : second + `秒后重新发送` }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="userLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getPhoneCode, userLogin } from '@/api/login'

export default {
  name: 'LoginPart',
  created () {
    this.getPicCode()
  },
  // 组件销毁时清除定时器
  destroyed () {
    clearInterval(this.timer)
  },
  data () {
    return {
      picBase64: '', // 图形验证码的 base64
      picKey: '', // 图形验证码的 key
      picCode: '', // 图形验证码
      phoneNumber: '', // 手机号
      SmsCode: '',
      totalSecond: 5, // 总秒数
      second: 5, // 倒计时的秒数
      timer: null // 定时器 id
    }
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const res = await getPicCode()
      this.picBase64 = res.data.base64
      this.picKey = res.data.key
      if (res.status !== 200) {
        this.$toast(res.message)
      }
    },
    // 验证手机号和图形验证码
    validPhoneNumberAndPicCode (phoneNumber) {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.picCode) {
        this.$toast('请输入图形验证码')
        return false
      }
      return true
    },
    // 开启定时器
    startTimer () {
      if (this.timer) return
      this.timer = setInterval(() => {
        this.second--
        if (this.second === 0) {
          clearInterval(this.timer)
          this.timer = null
          this.second = this.totalSecond
        }
      }, 1000)
    },
    // 获取手机验证码逻辑
    async getPhoneCode () {
      if (this.timer) return
      if (!this.validPhoneNumberAndPicCode(this.phoneNumber)) return
      const res = await getPhoneCode(this.picCode, this.picKey, this.phoneNumber)
      console.log(res)
      this.$toast('验证码发送成功')
      this.startTimer()
      return true
    },
    // 登录逻辑
    async userLogin () {
      // 验证手机号和图形验证码
      if (!this.validPhoneNumberAndPicCode(this.phoneNumber)) return
      if (!this.SmsCode) {
        this.$toast('请输入短信验证码')
        return
      }
      const res = await userLogin(this.phoneNumber, this.SmsCode)
      console.log(res)
      this.$toast('登录成功')
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, .1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
