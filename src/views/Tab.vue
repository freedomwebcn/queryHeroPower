<template>
  <div class="tab-wrapper">
    <div class="tab-content">
      <span class="tab-item" v-for="(tabItemText,index) in tabItemArr" :key="index" @click="$emit('updateIndex',index)"
        :class="{active:index === activeIndex}">{{tabItemText}}</span>
    </div>
    <div class="clear-fix"></div>
  </div>

</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    activeIndex: Number
  },
  setup() {
    const tabItemArr = ref([
      '全部',
      '战士',
      '法师',
      '坦克',
      '刺客',
      '射手',
      '辅助'
    ]);

    return {
      tabItemArr
    };
  }
};
</script>

<style lang="less" scoped>
.tab-wrapper {
  .tab-content {
    display: flex;
    position: fixed;
    width: 355px;
    height: 50px;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(255, 255, 255);
    z-index: 2;
    .tab-item {
      width: 30px;
      height: 24px;
      font-size: 13px;
      line-height: 24px;
      text-align: center;
      &.active {
        color: #db9e3f;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 2px;
          bottom: 0;
          width: 26px;
          height: 2px;
          background-color: #db9e3f;
        }
      }
    }
  }
}

.clear-fix {
  height: 50px;
}
</style>