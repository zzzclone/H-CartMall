<template>
  <div class="tab-control">
    <div v-for="(titles,index) in tabtitles" :key="index" class="tab-control-item" :class="{active: index === currentIndex}" @click="titlesClick(index)">
      <span>{{titles}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    tabtitles: {
      type: Array,
      default () {
        return []
      }
    },
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    titlesClick (index) {
      this.currentIndex = index
      // 把监听到的点击index子传父传递出去
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
}
.tab-control-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
.active span {
  padding: 6px;
  border-bottom: 3px solid var(--color-high-text);
}
</style>