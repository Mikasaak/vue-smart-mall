<template>
  <div>
    user
    <hr>
    <van-button type="primary" @click="$router.push('/login')">login</van-button>
    <hr>
    <van-button type="primary" @click="$router.push('/')">sing up</van-button>
  </div>
</template>

<script>
export default {
  name: 'UserPart'
}
</script>

<style scoped lang="scss">

</style>
