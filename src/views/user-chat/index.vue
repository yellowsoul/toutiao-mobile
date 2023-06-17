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
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
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
import { io } from 'socket.io-client'
import { getItem, setItem } from '@/utils/storage'

export default {
  name: 'UserChat',
  data() {
    return {
      message: '',
      socket: null, // WebSocket 通信对象
      messages: getItem('chat-messages') || [] // 消息列表
    }
  },

  computed: {},

  watch: {
    messages() {
      setItem('chat-messages', this.messages)

      // 如果你要在操作数据之后立即操作数据影响的视图DOM，那么最好把代码放到 nextTick 函数中
      // 数据改变影响视图更新这件事儿不是立即的
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },

  created() {
    // 建立连接
    const socket = io('http://ttapi.research.itcast.cn')
    // const socket = io('http://api-toutiao-web.itheima.net')
    this.socket = socket

    socket.on('connect', () => {
      console.log('连接建立成功了')
    })

    // 断开连接了
    socket.on('disconnect', () => {
      console.log('断开连接了')
    })

    // 发送消息
    // socket.emit('消息类型'，消息内容)
    // socket.on('消息类型'，function(data) { data消息 })

    // 监听 message 事件，接收服务端消息
    socket.on('message', (data) => {
      // 把对方发给我的消息放到数中
      this.messages.push(data)
    })
  },

  mounted() {
    this.scrollToBottom()
  },

  methods: {
    onSend() {
      // 请求发送消息
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)

      // 把用户发出去的消息存储到数组中
      this.messages.push(data)

      // 清空输入框
      this.message = ''
    },

    scrollToBottom() {
      const list = this.$refs['message-list']
      list.scrollTop = list.scrollHeight
    }
  }
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
