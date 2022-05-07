<template>
  <div class="wrong">
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Category",
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    this.scroll = new BScroll(document.querySelector(".wrong"), {
      probeType: 3,
      pullUpLoad: true,
      click: true
    })

    this.scroll.on('scroll', (position) => {
      console.log(position);
    })

    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
      // 要多次上拉加载更多此处可以再次发送请求
    })
  }, methods: {
    btnClick () {
      console.log(222);
    }
  }
}
</script>

<style>
</style>