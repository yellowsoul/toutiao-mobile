<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini"
        >编辑</van-button
      >
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        icon="clear"
      >
        <!--
          v-bind:class 语法
          一个对象，对象中的 key 表示要作用的 CSS 类名
                    对象中的value 要计算出布尔值
                    true,则作用该类名
                    false,不作用类名
        -->
        <span class="text" :class="{ active: index === active }" slot="text">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllchannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [] // 所有频道
    }
  },
  computed: {
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算属性会重新执行
    // 所有频道 - 用户频道 = 推荐频道
    recommendChannels() {
      // 数组的 filter 方法：遍历数组把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []

        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })

        // return channels
      })
    }
  //   recommendChannels() {
  //     const channels = []
  //     this.allChannels.forEach((channel) => {
  //       // find 遍历数组，找到满足条件的元素项
  //       const ret = this.myChannels.find((myChannel) => {
  //         return myChannel.id === channel.id
  //       })

  //       // 如果我的频道中不包括该频道项，则收集到推荐频道中
  //       if (!ret) {
  //         channels.push(channel)
  //       }
  //     })

  //     // 把计算结果返回
  //     return channels
  //   }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllchannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },

    // 添加频道事件
    onAddChannel(channel) {
      this.myChannels.push(channel)
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
    }
  }

  /deep/ .my-grid {
    .van-icon-clear {
      position: absolute;
      top: -8px;
      right: -8px;
      font-size: 32px;
      color: #cacaca;
      z-index: 2;
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
