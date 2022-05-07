<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :tabtitles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-concrol" v-show="isFaxed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentClick" :pull-up-load="true" @pullingUp='loadMore'>
      <home-slide :bann='banners'></home-slide>
      <home-details :details='recommends' @detailImageLoad="detailImageLoad"></home-details>
      <home-feature></home-feature>
      <tab-control :tabtitles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="topClick" v-show="isshowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSlide from 'views/home/childcponents/HomeSlide'
import HomeDetails from 'views/home/childcponents/Homedetails'
import HomeFeature from 'views/home/childcponents/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home';
import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Home',
  components: {
    HomeSlide,
    HomeDetails,
    HomeFeature,
    NavBar,
    TabControl,
    GoodsList,
    BackTop,
    Scroll,
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isshowBackTop: false,
      tabOffsetTop: 0,
      isFaxed: false,
      saveY: 0
    }
  },
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.scroll.y
  },
  created () {
    // 1、请求数据
    this.getHomeMultidata()

    // 2、请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    const refresh = this.debounce(this.$refs.scroll.refresh)
    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  methods: {
    debounce (func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
    // 事件监听相关方法
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    }, topClick () {
      this.$refs.scroll.scrollTo(0, 0, 500)
      // scroll里面的 scrollTo 属性可以设置x y轴的位置
    }, contentClick (position) {
      this.isshowBackTop = -(position.y) > 1000

      // 决定tabControl是否吸顶
      this.isFaxed = (-position.y) > this.tabOffsetTop
    }, loadMore () {
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()
    }, detailImageLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求相关方法
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      // 这里的page+1只是为了请求数据因为page默认的是0
      getHomeGoods(type, page).then(res => {
        // 这里res是当前请求到的type的数据，把res请求到的数据push到goods里面对应的type的list
        this.goods[type].list.push(...res.data.list)
        // 页码+1
        this.goods[type].page += 1
        // 上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
/* #home {
  padding-top: 44px;
} */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  z-index: 18;
  top: 0; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-concrol {
  position: relative;
  z-index: 11;
  background-color: #fff;
}
</style>