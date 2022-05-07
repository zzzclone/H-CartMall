<template>
  <el-carousel :interval="2000" height="300px" arrow="always">
    <el-carousel-item v-for="item in topImages" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name: 'DetailSlide',
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.el-carousel__indicator--horizontal .el-carousel__button {
  width: 10px;
  height: 10px;
  background: transparent;
  border: 1px solid #ffffff;
  border-radius: 50%;
  opacity: 0.5;
}
.el-carousel__indicator--horizontal.is-active .el-carousel__button {
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
  opacity: 1;
}
.el-carousel__indicators--horizontal {
  width: 300px;
  text-align: center;
}
</style>