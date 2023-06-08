<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon
        v-else
        name="delete-o"
        @click="isDeleteShow = true"
      ></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
    >
      <van-icon
        v-show="isDeleteShow"
        name="close"
        ></van-icon>
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
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
