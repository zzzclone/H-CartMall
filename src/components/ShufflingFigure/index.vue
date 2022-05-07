<template>
  <div class="slide-box">
    <span class="prev"></span>
    <div class="hot">
      <ul>
        <li style="background-color: gray;">
          轮播图1
        </li>
        <li style="background-color: hotpink;">
          轮播图2
        </li>
        <li style="background-color: #008c8c;">
          轮播图3
        </li>
      </ul>
    </div>
    <span class="next"></span>
  </div>
</template>

<script> 
import { slideshow } from "./until";
export default {
  components: {},
  mounted () {
    slideshow.init();
  },
  beforeDestroy () {
    slideshow.destroy();
  },

}
</script>

<style>
.slide-box {
  width: 750px;
  height: 390px;
  margin: 66px auto 0;
  position: relative;
}
.slide-box .prev,
.slide-box .next {
  display: block;
  width: 23px;
  height: 39px;
  position: absolute;
  top: 91px;
  cursor: pointer;
}

.slide-box .prev {
  background-color: hotpink;
  left: -53px;
}

.slide-box .next {
  background-color: blue;
  right: -53px;
}

.slide-box .hot {
  width: 375px;
  height: 221px;
  overflow: hidden;
}

.slide-box .hot ul {
  width: 375px;
  height: 221px;
  position: relative;
}

.slide-box ul li {
  width: 375px;
  height: 221px;
  float: left;
  font-size: 80px;
  list-style: none;
}
</style>