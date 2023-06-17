<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field
        v-model="message"
        placeholder="请输入消息内容"
        center
        clearable
      >
        <van-button slot="button" size="small" type="primary" @click="onSend"
          >发送</van-button
        >
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data() {
    return {
      message: ''
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style scoped lang="less">
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 106px;
    overflow-y: scroll;
    .message-item {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      padding: 10px;
      .msg-wrap {
        word-break: break-all;
        word-wrap: break-word;
      }
      .title {
        display: table;
        background: #e0effb;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        margin-right: 45px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .msg-wrap {
        display: flex;
        flex-direction: row-reverse;
        .title {
          margin-right: 5px;
          margin-left: 45px;
        }
      }
    }
  }

  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
