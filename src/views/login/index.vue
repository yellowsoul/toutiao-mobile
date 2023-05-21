<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!--/ 导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile" name="手机号" placeholder="请输入手机号">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code" name="验证码" placeholder="请输入验证">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <div class="send-wrap">
            <i class="send-line"></i>
            <van-button class="send-sms-btn" round size="small" type="default"
              >发送验证码</van-button
            >
          </div>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!--/ 登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data() {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user
      // TODO: 2. 表单验证

      // 在组件中必须通过 this.$toast 来调用 Toast 组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是 2000，如果为 0 则持续展示
      })
      // 3. 提交表单请求登录
      try {
        const res = await login(user)
        console.log('登录成功', res)
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }

      // 4. 根据请求响应结果处理后续操作
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 38px;
  }
  .send-wrap {
    display: flex;
    align-items: center;
  }
  .send-line {
    display: inline-block;
    width: 1px;
    height: 40px;
    background-color: #ededed;
    margin: 0 20px;
  }
  .send-sms-btn {
    background-color: #ededed;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
