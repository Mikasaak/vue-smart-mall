export const loginConfirm = {
  methods: {
    // 是否需要弹登录确认框
    // (1) 需要，返回 true，并直接弹出登录确认框
    // (2) 不需要，返回 false
    loginConfirm () {
      if (!this.$store.getters.UserInfo.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        }).then(
          () => {
            console.log('去登录')
            this.$router.replace({
              path: '/login',
              query: {
                redirect: this.$route.fullPath
              }
            })
          }
        )
          .catch(
            () => {
            }
          )
        return true
      }
      return false
    }
  }
}
