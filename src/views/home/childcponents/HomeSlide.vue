<template>
  <el-carousel :interval="2000" height="195px" arrow="always">
    <el-carousel-item v-for="(bannadd,item) in bann" :key="item">
      <a :href="bannadd.link"><img :src="bannadd.image"></a>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'HomeSlide',
  props: {
    bann: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.el-carousel__item img {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  /* line-height: 200px; */
  margin: 0;
  width: 100%;
}
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