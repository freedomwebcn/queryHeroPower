<template>
  <van-config-provider :theme-vars="themeVars" style="height: 100%">
    <!-- 英雄列表容器 -->
    <div class="hero-list-wrapper scroll-wrapper" ref="scrollRef">
      <header :class="{ 'header-bgc': showHeaderBgc }">
        <van-icon name="arrow-left" class="ico" @click="$router.back()" />
        <span class="header-text animate__animated animate__fadeIn" v-if="showHeaderBgc">{{ typeName }}</span>
      </header>
      <!-- 请求英雄列表数据 显示 loading  -->
      <div class="hero-list-loading" v-if="!filterHeroData.length && heroListLoadingErrStatus == null">
        <van-loading type="spinner" color="#fff" />
      </div>
      <div class="scroll-content">
        <div class="hero-list-content">
          <h2 class="type-name">{{ typeName }}</h2>
          <ul class="hero-list">
            <li class="hero-list-item" v-for="heroItem in filterHeroData" :key="heroItem.cname" @click="openPopup(heroItem.cname, heroItem.iconUrl)">
              <img v-lazy="heroItem.iconUrl" class="ico" alt="" />
              <span class="hero-name">{{ heroItem.cname }}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 请求英雄列表数据失败 显示错误提示 -->
      <div class="hero-list-err-wrapper" v-if="heroListLoadingErrStatus" @click="tryGetHeroData">
        <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" />
      </div>
      <!-- 查询英雄战力弹出层 -->
      <van-popup v-model:show="isShowPopup" round @closed="popupClosed">
        <PopupContent v-bind="popupContentProps" @getPopupData="(value) => getHeroPowerData(value)" />
      </van-popup>
    </div>
  </van-config-provider>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import "vant/es/notify/style";
import PopupContent from "./PopupContent";
import { useReqHeroListData } from "./getHeroList";
import { useReqHeroPowerData } from "./getHeroPower";
import { themeVars } from "@/ui_option";

const route = useRoute();
const typeId = ref(route.params.typeId); //英雄职业对应ID
const typeName = ref(route.params.typeName); //英雄职业名字
const showHeaderBgc = ref(false); // 滑动英雄列表显示头部背景色和内容
const scrollRef = ref(null);
let isShowPopup = ref(false);
// 从请求英雄列表数据模块中提取出来需要的数据
let { getHeroData, filterHeroData, heroListLoadingErrStatus } = useReqHeroListData(typeId);
// 如果英雄列表数据获取失败 点击尝试重新获取数据
const tryGetHeroData = () => {
  heroListLoadingErrStatus.value = null;
  getHeroData();
};

// 请求英雄战力数据参数
let queryInfo = ref({ heroName: "", type: "aqq" });
let heroImgUrl = ref("");
const { getHeroPowerData, heroPowerData, isShowLoading, heroPowerStatus } = useReqHeroPowerData(queryInfo);
// 打开弹出层触发
const openPopup = (heroName, ico) => {
  isShowPopup.value = true;
  queryInfo.value.heroName = heroName;
  heroImgUrl.value = ico;
  getHeroPowerData();
};
// popupcontent 组件需要的props
const popupContentProps = ref({
  heroPowerData,
  isShowLoading,
  heroPowerStatus,
  queryInfo,
  heroImgUrl,
});
// 弹出层关闭触发
const popupClosed = () => {
  // 弹出层tab active类 关闭时设置默认值
  queryInfo.value.type = "aqq";
  heroPowerData.value = null;
};
// 监听滚动
onMounted(() => {
  scrollRef.value.addEventListener("scroll", function (e) {
    e.target.scrollTop >= 58 ? (showHeaderBgc.value = true) : (showHeaderBgc.value = false);
  });
});
</script>
<style lang="less" scoped>
@import "@/Mixins/dScrollBar";

.hero-list-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;
  .delete-scroll-bar();

  header {
    width: 375px;
    display: flex;
    position: fixed;
    align-items: center;
    z-index: 66;
    padding: 16px 10px;

    &.header-bgc {
      background-color: #181818;
    }

    .header-text {
      font-size: 15px;
      padding-left: 5px;
      color: white;
    }

    .ico {
      color: white;
      font-size: 25px;
    }
  }

  .scroll-content {
    position: relative;
    background-image: linear-gradient(rgba(83, 83, 83, 0.8) 0%, transparent 165px);

    .hero-list-content {
      position: relative;
      z-index: 2;
      padding: 72px 10px 0 10px;

      .png {
        width: 100px;
        height: 100px;
        position: absolute;
        left: -15px;
      }

      .type-name {
        padding: 22px 22px 2px 22px;
        font-size: 28px;
        font-weight: 500;
        color: white;
        margin-top: 0;
      }

      .hero-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;

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

  .hero-list-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .hero-list-err-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
>
