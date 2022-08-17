<template>
  <div class="home-container">
    <div class="home-content">
      <div class="hero-tab ">
        <span class="tab-item" @click="moveSlide(0)" :class="{active:tabActiveIndex==0}">全部</span>
        <span class="tab-item" @click="moveSlide(1)" :class="{active:tabActiveIndex==1}">战士</span>
        <span class="tab-item" @click="moveSlide(2)" :class="{active:tabActiveIndex==2}">法师</span>
        <span class="tab-item" @click="moveSlide(3)" :class="{active:tabActiveIndex==3}">坦克</span>
        <span class="tab-item" @click="moveSlide(4)" :class="{active:tabActiveIndex==4}">刺客</span>
        <span class="tab-item" @click="moveSlide(5)" :class="{active:tabActiveIndex==5}">射手</span>
        <span class="tab-item" @click="moveSlide(6)" :class="{active:tabActiveIndex==6}">辅助</span>
      </div>
      <div class="clear-fix"></div>
      <div class="hero-list-container swiper-container">

        <div class="swiper-wrapper hero-list-wrapper ">
          <ul class="hero-list-content  swiper-slide" v-for="(heroData,index) in heroList" :key="index">
            <li class="hero-list-item" v-for="heroObj in heroData" :key="heroObj.cname">
              <img :src="heroObj.iconUrl" alt="" class="hero-avt">
              <span class="hero-name">{{heroObj.cname}}</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>

</template>
<script >
import Swiper from 'swiper/js/swiper.min.js';
import { reqHeroData } from '@/api';
import { ref, computed, nextTick } from 'vue';
export default {
  setup() {
    let tabActiveIndex = ref(0);
    let heroList = ref([]);
    let heroListSwiper;
    const formatData = [];
    // 请求英雄列表数据
    reqHeroData().then(heroData => {
      formatData.push(heroData);
      for (let index = 1; index <= 6; index++) {
        formatData.push(
          heroData.filter(item => {
            return item.hero_type === index;
          })
        );
      }
      heroList.value = formatData;
      // 一定要在数据改变后 使用nextTick初始化
      nextTick(() => {
        heroListSwiper = new Swiper('.swiper-container', {
          on: {
            transitionStart: function() {
              tabActiveIndex.value = this.activeIndex;
            }
          }
        });
      });
    });

    function moveSlide(index) {
      heroListSwiper.slideTo(index, 500);
    }
    return {
      heroList,
      tabActiveIndex,
      moveSlide
    };
  }
};
</script>
<style lang="less" scope >
.home-container {
  height: 100%;

  .home-content {
    height: 100%;

    .hero-tab {
      display: flex;
      position: fixed;
      width: 345px;
      height: 50px;
      align-items: center;
      justify-content: space-around;
      background-color: #f1f1f1;
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
            height: 3px;
            background-color: #db9e3f;
          }
        }
      }
    }
    .clear-fix {
      height: 50px;
    }
    .hero-list-container {
      .hero-list-wrapper {
        .hero-list-content {
          display: flex;
          flex-wrap: wrap;
          overflow-y: scroll;
          //   chrome去除滚动条样式
          &::-webkit-scrollbar {
            display: none;
          }
          //   兼容火狐
          &.scw {
            scrollbar-width: none;
          }
          //   兼容IE10+
          &.msscw {
            -ms-overflow-style: none;
          }
          .hero-list-item {
            display: flex;
            flex: 0 0 20%; //只设置长度单位,此时flex-grow和flex-shrink默认值不再是0，而是1。
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 16px;
            .hero-avt {
              height: 56px;
              margin-bottom: 5px;
            }
            .hero-name {
              width: 56px;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>>

