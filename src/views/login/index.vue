<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" />
    <!--/ 导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        name="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        type="password"
        name="验证码"
        placeholder="请输入验证"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!--/ 登录表单 -->
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data() {
    return {
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style lang="less" scoped></style>
