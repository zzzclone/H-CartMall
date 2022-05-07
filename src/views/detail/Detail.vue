<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref="navDetail" />
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-slide :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goodslist ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addClick="addToClick" />
    <!-- <toast :message='message' :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childCom/DetailNavBar.vue'
import DetailSlide from './childCom/DetailSlide.vue'
import DetailBaseInfo from './childCom/DetailBaseInfo.vue'
import DetailShopInfo from './childCom/DetailShopInfo.vue'
import DetailGoodsInfo from './childCom/DetailGoodsInfo.vue'
import DetailParamInfo from './childCom/DetailParamInfo.vue'
import DetailCommentInfo from './childCom/DetailCommentInfo.vue'
import Goodslist from 'components/content/goods/GoodsList.vue'
import DetailBottomBar from './childCom/DetailBottomBar.vue'
import Toast from 'components/common/toast/Toast.vue'


import Scroll from 'components/common/scroll/Scroll.vue'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      desc: [],
      currentIndex: 0,
      // message: '',
      // show: false
    }
  },
  components: {
    DetailNavBar,
    DetailSlide,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    Goodslist,
    // Toast
  }, created () {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid
    // 2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1、获取顶部的轮播图部分
      this.topImages = data.itemInfo.topImages
      // 2、获取商品内容
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3、店铺信息的展示
      this.shop = new Shop(data.shopInfo)
      // 4、商品详情数据展示（此处数据简单不需要创建类
      this.detailInfo = data.detailInfo
      // 5、商品参数的展示
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 6、取出评论的信息（有的有评论有的无，所以进行判断
      this.commentInfo = data.rate.list[0]
    })
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  methods: {
    // 映射actions
    ...mapActions(['addCart']),
    imageLoad () {
      // 刷新内容
      this.$refs.scroll.refresh()
      // 图片加载完后获取位置
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    // 获取到位置信息
    contentScroll (position) {
      //  1、获取position的y值
      const positionY = -position.y
      // 2、将positionY和主题中的值对比，决定当前应该显示哪一个index
      let length = this.themeTopYs.length
      for (var i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.navDetail.currentIndex = this.currentIndex
        }
      }
    },
    // 监听购物车
    addToClick () {
      // 1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2、将商品添加到购物车里面 用vuex管理商品  
      this.addCart(product).then(res => {
        // // 加入购物车后根据res显示不同内容
        // this.show = true;
        // this.message = res
        // // 显示后1.5s消失
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 1500);
        this.$toast.show(res, 1500)
      })
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>