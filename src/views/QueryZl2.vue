<template>
  <div class="hero-wrapper">

    <div class="test">
      <div style="background-color: rgb(39, 133, 106);" class="query-wrapper">
        <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" alt="">
        <span>战士</span>
      </div>

      <div style="background-color: rgb(141, 103, 171);" class="query-wrapper">
        <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" alt="">
        <span>坦克</span>
      </div>

      <div style="background-color: rgb(232, 17, 91);" class="query-wrapper">
        <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" alt="">
        <span>法师</span>
      </div>
    </div>

    <!-- <div style="background-color: rgb(232, 17, 91);" class="query-wrapper">
      <img src="https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" alt="">
      <span>法师</span>
    </div> -->

  </div>

</template>
<script >
import { ref, computed, nextTick } from 'vue';
import { Notify } from 'vant';
import 'vant/es/notify/style';
export default {
  components: {},
  setup(props) {}
};
</script>
<style lang="less" scoped >
.hero-wrapper {
  height: 100%;
  padding: 0 16px;
  background-color: rgb(18, 18, 18);
  overflow: hidden;
  .test {
    margin-top: 56px;
  //   align-content: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    .query-wrapper {
      height: 92px;
      flex: 0 0 47.6%;
      border-radius: 4px;
      padding: 10px;
      position: relative;
      overflow: hidden;
      margin-bottom: 16px;

      img {
        height: 56px;
        width: 56px;
        position: absolute;
        bottom: 0;
        right: 0;
        transform: rotate(25deg) translate(18%, -2%);
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
      }
      span {
        color: white;

        font-size: 16px;
      }
    }
  }
}
</style>>

