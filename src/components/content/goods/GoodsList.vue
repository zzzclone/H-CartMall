<template>
  <div class="goods">
    <!-- 这里要展示的是一张张小的item图片 -->
    <goodslist-item v-for="item in goods" :goods-item="item" :key="item.id"></goodslist-item>
  </div>
</template>

<script>
import GoodslistItem from './GoodslistItem.vue'
export default {
  name: 'Goodslist',
  components: {
    GoodslistItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>