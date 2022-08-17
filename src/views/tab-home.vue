<template>
  <div class="home-container">
    <tab @updateIndex=updateIndex :activeIndex="activeIndex" />
    <div class="home-content" v-if="heroList.length">
      <div class="hero-list-container">

        <ul class="hero-list-content " v-for="(heroData, index) in heroList" :key="index"
          v-show="index === activeIndex">
          <li class="hero-list-item" v-for="heroObj in heroData" :key="heroObj.cname">
            <img v-lazy="heroObj.iconUrl" alt="" class="hero-avt">
            <span class="hero-name">{{heroObj.cname}}</span>
          </li>
        </ul>

      </div>
    </div>

    <div class="loading" v-if="!heroList.length && errStatus==null">
      <van-loading type="spinner" color="#db9e3f" />
    </div>

  </div>

</template>
<script >
import { reqHeroData } from '@/api';
import { ref } from 'vue';
import tab from './Tab';
import { Notify } from 'vant';
import 'vant/es/notify/style';
export default {
  components: {
    tab
  },
  setup() {
    let activeIndex = ref(0);
    let heroList = ref([]);
    let errStatus = ref(null);
    const formatData = [];
    // 请求英雄列表数据
    reqHeroData().then(
      heroData => {
        formatData.push(heroData);
        for (let index = 1; index <= 6; index++) {
          formatData.push(
            heroData.filter(item => {
              return item.hero_type === index;
            })
          );
        }

        heroList.value = formatData;
      },
      err => {
        if (err) {
          console.log(err);
          toNotify();
        }
        errStatus.value = err;
      }
    );

    function updateIndex(index) {
      activeIndex.value = index;
    }

    function toNotify() {
      Notify({
        type: 'danger',
        message: '数据请求失败,请刷新重试 !'
      });
    }
    return {
      heroList,
      activeIndex,
      updateIndex,
      errStatus
    };
  }
};
</script>
<style lang="less" scoped >
@import '@/Mixins/dScrollBar';

.home-container {
  height: 100%;
  .home-content {
    height: calc(100% - 50px);
    overflow-y: scroll;
    .delete-scroll-bar();
    .hero-list-container {
      height: 100%;
      .hero-list-content {
        display: flex;
        flex-wrap: wrap;
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

  .loading {
    display: flex;
    justify-content: center;
    position: relative;
    top: calc(50% - 50px);
    transform: translateY(-50%);
  }
}
</style>>

