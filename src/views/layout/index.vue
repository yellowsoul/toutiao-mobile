<template>
  <div class="layout-container">
    <!-- layout 的子路由出口，或者说是二级路由 -->
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!-- route: 开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data() {
    return {}
  },
  mounted() {
    // 把组件再次的缓存起来
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
