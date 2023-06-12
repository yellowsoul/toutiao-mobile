<template>
<van-icon
  :color="value ? '#ffa500' : '#777'"
  :name="value ? 'star' : 'star-o'"
/>
</template>

<script>
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
