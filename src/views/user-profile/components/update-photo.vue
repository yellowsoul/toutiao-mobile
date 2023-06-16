<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
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
    return {
      cropper: null
    }
  },
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 限制裁剪框不超过画布的大小
      dragMode: 'move', // 移动画布
      aspectRatio: 1, // 纵横比
      autoCropArea: 1, // 自动裁剪区域
      cropBoxMovable: false, // 裁剪框是否可移动
      cropBoxResizable: false, // 裁剪框是否可调整大小
      background: false, // 显示容器的网格背景。
      movable: true // 启用以移动图像
    })
  },
  methods: {
    onConfirm() {
      // 如果是基于服务端的裁切，则使用：getData 方法，该方法得到裁切的区域参数。
      // console.log(this.cropper.getData())
      // 如果是纯客户端的图片裁切，则使用：getCroppedCanvas 方法，该方法得到裁切之后的图片对象（类似于URL.createObjectURL 方法得到的文件对象）。
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob)
      })
    }
  }
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
