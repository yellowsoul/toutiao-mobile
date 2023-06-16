<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm">完成</div>
    </div>
  </div>
</template>

<script>
// 图片裁切插件
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

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
  mounted() {
    const image = this.$refs.img
    const cropper = new Cropper(image, {
      viewMode: 1, // 限制裁剪框不超过画布的大小
      dragMode: 'move', // 移动画布
      aspectRatio: 1, // 纵横比
      autoCropArea: 1, // 自动裁剪区域
      cropBoxMovable: false, // 裁剪框是否可移动
      cropBoxResizable: false, // 裁剪框是否可调整大小
      background: false, // 显示容器的网格背景。
      movable: true // 启用以移动图像
    })
    console.log(cropper)
  },
  methods: {}
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
