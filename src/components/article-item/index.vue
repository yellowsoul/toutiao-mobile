<template>
  <div class="article-item">文章列表项</div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
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
