<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete-o"></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
    >
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistor',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
