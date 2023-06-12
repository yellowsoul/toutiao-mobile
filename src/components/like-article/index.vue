<template>
  <van-icon
    :color="value ===1 ? '#e5645f' : '#777'"
    :name="value ===1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="onCollect"
  />
</template>

<script>
// import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
    }
  }
}
</script>

<style scoped lang="less"></style>
