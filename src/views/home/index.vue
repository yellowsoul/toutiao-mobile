<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!--/ 导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'HomeIndwx',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.home-container {
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
</style>
<style lang="less">
.home-container {
  .van-nav-bar__title {
    max-width: unset;
  }
}
</style>
