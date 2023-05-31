<template>
  <div class="article-list">
    <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
    -->
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
// const nowTime = new Date();
// const lastWeekTime = nowTime.setDate(nowTime.getDate() - 1000);
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      list: [], // 储存列表数据的数据
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          // timestamp 简单理解就是请求数据的页码
          // 请求第1页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(), // 时间戳整数 单位毫秒
          with_top: 1 // 0或1 -> 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('aaasdf')
        // }

        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        // 数组的展开操作符，它会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据全部是否加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将finished 设置为 true，不再 load 加载更多
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        // 展示错误提示状态
        this.error = true

        // 请求失败了，loading 也需要关闭
        this.loading = false
      }
    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新，每次获取最新数据，所以传递当前最新时间戳
          with_top: 1 // 0或1 -> 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 模拟随机失败的情况
        // if (Math.random() > 0.2) {
        //   JSON.parse('aaasdf')
        // }

        // 2. 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        // console.log('请求失败')
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }

    // 初始化或滚动列表底部的时候会触发调用 onLoad -> 每滚动至底部一次onLoad执行一次
    // onLoad() {
    //   // 1. 请求获取数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     // 2. 把请求结果数据放到 list 数组中
    //     for (let i = 0; i < 10; i++) {
    //       // 0 + 1 = 1
    //       // 1 + 1 = 2
    //       this.list.push(this.list.length + 1)
    //     }

    //     // 3. 本次数据加载结束之后要把加载状态设置为结束
    //     //    loading 关闭以后才能触发一下次的加载更多
    //     this.loading = false

    //     // 4. 判断数据全部是否加载完成
    //     if (this.list.length >= 40) {
    //       // 如果没有数据了，把 finished 设置为 true ，之后不再加触发加载更多
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
  }
}
</script>

<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  height: calc(100vh - (92px + 82px + 100px));
  overflow-y: auto;
}
</style>
