<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!--/ 导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        left-icon="smile-o"
        name="手机号"
        placeholder="请输入手机号"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        type="password"
        name="验证码"
        placeholder="请输入验证"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <div class="send-wrap">
            <i class="send-line"></i>
            <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
          </div>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
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

<style lang="less" scoped>
.login-container {
  .toutiao{
    font-size:38px;
  }
  .send-wrap{
    display: flex;
    align-items: center;
  }
  .send-line{
    display: inline-block;
    width:1px;
    height:40px;
    background-color:#ededed;
    margin:0 20px;
  }
  .send-sms-btn{
    background-color: #ededed;
    height:46px;
    line-height: 46px;
    font-size:22px;
  }
  .login-btn-wrap{
    padding: 53px 33px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
