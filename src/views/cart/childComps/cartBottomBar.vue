<template>
  <div class="bottom-bar">
    <!-- 全选按钮 -->
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="allClick" />
      <span>标题</span>
    </div>
    <!-- 合计 -->
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <!-- 计算 -->
    <div class="calculate" @click="calcClick">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
// 导入选中按钮
import checkButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'cartBottomBar',
  components: {
    checkButton
  },
  computed: {
    totalPrice () {
      return '¥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        // 通过reduce返回计算后的商品价格
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength () {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      //1、判断当购物车里面空的时候 不选中
      if (this.$store.state.cartList.length === 0) {
        return false
      }
      //2、 判断是否全部选中 
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    allClick () {
      if (this.isSelectAll) { //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }
      else {//部分或者全部没选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick () {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 80px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 120px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>