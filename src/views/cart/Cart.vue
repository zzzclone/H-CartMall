<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品展示列表 -->
    <cart-list />
    <!-- 底部的汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/cartList.vue'
import cartBottomBar from './childComps/cartBottomBar.vue'

import { mapGetters } from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    cartList,
    cartBottomBar
  },
  computed: {
    // ...mapGeters('cartLength')
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
