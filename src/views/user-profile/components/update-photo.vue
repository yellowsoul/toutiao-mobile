<template>
  <img class="img" :src="img" />
</template>

<script>
export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.img {
  max-width: 100%;
}
</style>
