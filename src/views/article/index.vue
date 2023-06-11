<template>
  <div class="article-container">文章详情页</div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String],
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
