<template>
  <div class="recommend">
    <div v-for="(deta,item) in details" :key="item" class="recommend-item">
      <a :href="deta.link">
        <img :src="deta.image" alt="" @load="imageLoad">
        <div>{{deta.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homedetails',
  props: {
    details: {
      type: Array,
      default: []
    }
  }, data () {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad () {
      this.$emit('detailImageLoad')
    },
    imageLoad () {
      if (!this.isLoad) {
        this.$emit('detailImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  padding: 10px 0 30px 0;
  border-bottom: 10px solid #eee;
  font-size: 14px;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 70px;
  padding-bottom: 8px;
}
</style>