<template>
  <van-config-provider :theme-vars="themeVars" style="height:100%">
    <div class="hero-list-wrapper scroll-wrapper" ref="scrollRef">
      <header :class="{'header-bgc':showHeaderBgc}">
        <van-icon name="arrow-left" class="ico" @click="goback" />
        <span class="header-text animate__animated animate__fadeIn" v-if="showHeaderBgc">{{typeName}}</span>
      </header>
      <!-- 请求英雄列表数据 显示 loading  -->
      <div class="heroListLoading" v-if="!filterHeroData.length && heroListLoadingErrStatus==null">
        <van-loading type="spinner" color="255, 255, 255" />
      </div>
      <div class="scroll-content">
        <div class="hero-list-content">
          <h2 class="type-name">{{typeName}}</h2>
          <ul class="hero-list">
            <li class="hero-list-item" v-for="heroItem in filterHeroData" :key="heroItem.cname"
              @click="showPopup(heroItem.cname,heroItem.iconUrl)">
              <img v-lazy="heroItem.iconUrl" class="ico" alt="">
              <span class="hero-name">{{heroItem.cname}}</span>
            </li>
          </ul>
        </div>

      </div>
      <!-- 请求英雄列表数据失败 显示错误提示 -->
      <div class="hero-list-err-wrapper" v-if="heroListLoadingErrStatus" @click="tryGetHeroData">
        <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" />
      </div>

      <!-- 弹出层 -->
      <van-popup v-model:show="show" round @closed=popupClosed>
        <div class="popup-content">
          <h5 class="popup-hero-name  ">
            <img :src="heroIcoUrl" alt="" class="animate__animated animate__headShake ">
          </h5>
          <div class="tab-wrapper">
            <span style="display:inline-block" @click="getHeroPowerData(tabItem.systemType)" v-for="tabItem in tabList"
              :key="tabItem" :class="{ active: tabItem.systemType === queryInfo.type }">
              {{tabItem.systemName}}
            </span>
          </div>
          <div class="van-hairline--top hairline"></div>
          <div class="hero-power-wrapper">
            <div class="hero-power-content">
              <template v-if="heroPowerData">
                <div class="administrative-region-wrapper  animate__animated " :class="{animate__fadeIn:isFadein}">
                  <div class="administrative-region-content">
                    <span class="reward">省级</span>
                    <span class="administrative-region">{{heroPowerData.province}}</span>
                    <span class="score">{{heroPowerData.provincePower+'分'}}</span>
                  </div>
                  <div class="administrative-region-content">
                    <span class="reward">市级</span>
                    <span class="administrative-region">{{heroPowerData.city}}</span>
                    <span class="score">{{heroPowerData.cityPower+'分'}}</span>
                  </div>
                  <div class="administrative-region-content">
                    <span class="reward">区级</span>
                    <span class="administrative-region">{{heroPowerData.area}}</span>
                    <span class="score">{{heroPowerData.areaPower+'分'}}</span>
                  </div>
                </div>
              </template>
              <div class="hero-power-content-loading" v-else-if="isShowLoading && heroPowerStatus === null ">
                <van-loading size="24px" vertical>加载中...</van-loading>
              </div>

              <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" v-if="heroPowerStatus"
                @click="getHeroPowerData(null)" />

            </div>
            <div class="update-time-wrapper" v-if="heroPowerData">
              <span class="update-time">数据更新时间:{{ heroPowerData.updatetime}}</span>
            </div>
          </div>
        </div>
      </van-popup>

    </div>

  </van-config-provider>

</template>
<script >
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';
import { reqHeroData, reqHeroPower } from '@/api';
import { Notify } from 'vant';
import 'vant/es/notify/style';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const typeId = ref(route.params.typeId); //英雄职业对应ID
    const typeName = ref(route.params.typeName);
    let heroData = ref(
      JSON.parse(window.sessionStorage.getItem('allHeroData')) || []
    );
    let heroListLoadingErrStatus = ref(null); //英雄列表数据请求状态
    const show = ref(false); //是否要展示查询英雄战力弹出层
    // 请求参数 查询英雄战力
    const queryInfo = ref({
      heroName: '',
      type: ref('aqq')
    });
    // 英雄战力数据
    let heroPowerData = ref(null);
    let heroIcoUrl = ref('');
    const isFadein = ref(false);
    const isShowLoading = ref(false); //查询英雄战力 显示loading
    const heroPowerStatus = ref(null); //请求英雄战力数据的状态
    const showHeaderBgc = ref(false); // 滑动英雄列表显示头部背景色和内容
    const tabList = [
      {
        systemType: 'aqq',
        systemName: '安卓QQ区'
      },
      {
        systemType: 'awx',
        systemName: '安卓VX区'
      },
      {
        systemType: 'iqq',
        systemName: '苹果QQ区'
      },
      {
        systemType: 'iwx',
        systemName: '苹果VX区'
      }
    ];

    // 请求英雄列表数据
    const getHeroData = () => {
      // 数据保存在sessionStorage中，如果再次请求 本地存储存在英雄列表数据，就return
      if (heroData.value.length) return;

      reqHeroData().then(
        allHeroData => {
          // 本地存储数据
          window.sessionStorage.setItem(
            'allHeroData',
            JSON.stringify(allHeroData)
          );

          heroData.value = allHeroData;
        },
        err => {
          // 数据请求失败
          if (err) {
            console.log(err);
            // 显示错误提示
            toNotify();
          }

          heroListLoadingErrStatus.value = err;
        }
      );
    };
    // 因为没有英雄职业对应的接口，现在用计算属性从所有英雄数据中过滤出来英雄职业对应的数据
    const filterHeroData = computed(() => {
      return heroData.value.filter(heroObj => {
        return heroObj.hero_type === typeId.value * 1;
      });
    });
    getHeroData();
    // 英雄列表数据加载失败 尝试重新获取数据
    const tryGetHeroData = () => {
      heroListLoadingErrStatus.value = null;
      getHeroData();
    };
    // 获取英雄战力数据
    const getHeroPowerData = async type => {
      queryInfo.value.type = type || queryInfo.value.type;
      heroPowerData.value = null;
      isShowLoading.value = true;
      heroPowerStatus.value = null;
      try {
        heroPowerData.value = await reqHeroPower(queryInfo.value);
        isFadein.value = true;
      } catch (error) {
        heroPowerStatus.value = error;
        console.log(error);
      }
    };

    const scrollRef = ref(null);
    let scrollTop;
    watchEffect(() => {
      if (scrollRef.value) {
        scrollRef.value.addEventListener('scroll', function(e) {
          scrollTop = e.target.scrollTop;
          if (scrollTop >= 58) {
            showHeaderBgc.value = true;
          } else {
            showHeaderBgc.value = false;
          }
        });
      }
    });
    function toNotify() {
      Notify({
        type: 'danger',
        message: '数据请求失败,请重新重试 !'
      });
    }

    function goback() {
      router.back();
    }
    //展示弹出层事件
    const showPopup = (heroName, url) => {
      show.value = true;
      queryInfo.value.heroName = heroName;
      heroIcoUrl.value = url;
      getHeroPowerData();
    };
    const popupClosed = () => {
      queryInfo.value.type = 'aqq';
    };
    const themeVars = {
      popupRoundBorderRadius: '6px',
      emptyPadding: '0px',
      emptyDescriptionPadding: '0px'
    };

    return {
      heroListLoadingErrStatus,
      filterHeroData,
      typeName,
      goback,
      show,
      showPopup,
      themeVars,
      getHeroPowerData,
      heroPowerData,
      heroIcoUrl,
      tabList,
      queryInfo,
      isFadein,
      isShowLoading,
      heroPowerStatus,
      tryGetHeroData,
      popupClosed,
      scrollRef,
      showHeaderBgc
    };
  }
};
</script>
<style lang="less" scoped>
@import '@/Mixins/dScrollBar';
.hero-list-wrapper {
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  .delete-scroll-bar();

  header {
    width: 100%;
    position: fixed;
    z-index: 66;
    padding: 16px 10px 16px 10px;
    display: flex;
    align-items: center;
    &.header-bgc {
      background-image: linear-gradient(rgba(83, 83, 83) 0%, black 150px);
    }

    .header-text {
      font-size: 15px;
      padding-left: 5px;
      color: white;
    }

    // &.header-bgc {
    //   backdrop-filter: brightness(100%) blur(3px);
    // }
    .ico {
      color: white;
      font-size: 25px;
    }
  }

  .scroll-content {
    position: relative;
    background-image: linear-gradient(
      rgba(83, 83, 83, 0.8) 0%,
      transparent 165px
    );

    .hero-list-content {
      position: relative;
      z-index: 2;
      padding-top: 72px;
      .type-name {
        padding: 22px 22px 2px 22px;
        font-size: 28px;
        font-weight: 500;
        color: white;
        margin-top: 0;
      }
      .hero-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr [col-start]);
        grid-column-gap: 10px;
        grid-row-gap: 10px;
        .hero-list-item {
          display: grid;
          justify-items: center;
          grid-row-gap: 5px;
          padding: 10px;
          background: #181818;
          border-radius: 4px;
          .ico {
            height: 56px;
            border-radius: 4px;
          }
          .hero-name {
            color: white;
          }
        }
      }
    }
  }

  .hero-list-err-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .heroListLoading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .popup-content {
    width: 280px;
    height: 280px;
    padding: 12px;

    .popup-hero-name {
      display: flex;
      justify-content: center;
      font-size: 16px;
      margin: 5px 0 5px 0;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .tab-wrapper {
      display: grid;
      justify-items: center;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      padding: 15px 0;
      font-size: 13px;
      span {
        font-weight: 600;
        &.active {
          color: #db9e3f;
        }
      }
    }
    .hero-power-wrapper {
      .hero-power-content {
        .hero-power-content-loading {
          height: 159px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .administrative-region-wrapper {
          padding: 15px 3px 12px 3px;
          display: grid;
          grid-row-gap: 20px;
          font-size: 13px;

          .administrative-region-content {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;

            .reward {
            }
            .administrative-region {
            }
            .score {
              justify-self: end;
            }
          }
        }
      }
    }
    .update-time-wrapper {
      display: grid;
      justify-items: end;
      padding: 5px 3px 0px 3px;
      color: rgb(200, 201, 204);
    }
  }
}
</style>>

