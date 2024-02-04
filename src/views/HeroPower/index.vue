<template>
  <!-- van-config-provider ---- ui框架组件 用来配置框架样式 -->
  <van-config-provider :theme-vars="searchthemeVars" style="height: 100%">
    <div class="hero-power-container">
      <header>
        <van-icon name="arrow-left" class="ico" @click="$router.back()" />
      </header>
      <div class="hero-power-content" v-if="heroPowerData && heroPowerData.length">
        <div class="title van-hairline--bottom animate__animated animate__fadeIn">
          <span>区服</span>
          <span>地区(省/市/区标)</span>
          <span>分数</span>
        </div>
        <template v-for="(item, index) in heroPowerData" :key="item.name">
          <div :class="`hero-power${index + 1} animate__animated animate__fadeInLeft ${index === heroPowerData.length - 1 ? '' : 'van-hairline--bottom'}`">
            <span class="dctype">{{ GAMETYPES[index].type }}</span>

            <div class="district">
              <span>{{ item.province }}</span>
              <span>{{ item.provincePower }}</span>
            </div>
            <div class="district">
              <span>{{ item.city }}</span>
              <span>{{ item.cityPower }}</span>
            </div>
            <div class="district">
              <span>{{ item.area }}</span>
              <span>{{ item.areaPower }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="loading" v-if="!heroPowerData.length && errStatus == null">
        <van-loading type="spinner" color="#fff" />
      </div>
      <div class="err-wrapper" v-if="errStatus" @click="getHeroPowerData">
        <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" style="color: white" />
      </div>
    </div>
  </van-config-provider>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { reqHeroPower } from "@/api";
import { searchthemeVars } from "@/ui_option";

const route = useRoute();
const heroName = route.query.heroName;
let heroPowerData = ref([]);
let errStatus = ref(null);
const GAMETYPES = [
  {
    type: "安卓QQ",
    param: "aqq",
  },
  {
    type: "安卓WX",
    param: "awx",
  },
  {
    type: "苹果QQ",
    param: "iqq",
  },
  {
    type: "苹果WX",
    param: "iwx",
  },
];

function getHeroPowerData() {
  errStatus.value = null;
  const requests = GAMETYPES.map(({ param }) => reqHeroPower({ heroName, type: param }));
  Promise.all(requests)
    .then((vals) => (heroPowerData.value = vals))
    .catch((error) => (errStatus.value = error));
}
getHeroPowerData();
</script>

<style lang="less" scoped>
.hero-power-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::after {
    content: "";
    position: absolute;
    background: url(./bg.png) center center no-repeat;
    background-size: contain;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 0.5;
  }

  header {
    width: 100%;
    position: fixed;
    z-index: 66;
    padding: 16px 10px;
    color: white;
    font-size: 25px;
    display: flex;
    align-items: center;

    span {
      padding-left: 10px;
      font-size: 16px;
    }
  }

  .hero-power-content {
    width: 100%;
    height: 100%;
    padding: 56px 16px 10px 16px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    color: white;
    text-align: center;
    position: relative;
    z-index: 2;

    .title {
      display: grid;
      grid-column: 1 / 4;
      grid-template-columns: 1fr 1fr 1fr;
      font-size: 15px;
    }

    .hero-power1 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: repeat(3, 1fr);
      grid-column: 1 / 4;
      grid-row: 2 / span 6;
      font-size: 14px;

      .dctype {
        align-self: center;
        grid-row: 1 / span 3;
      }

      .district {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-column: 2 / 4;
        align-items: center;
      }
    }

    .hero-power2 {
      .hero-power1();
      grid-row: 8 / span 6;
    }

    .hero-power3 {
      .hero-power1();
      grid-row: 14 / span 6;
    }

    .hero-power4 {
      .hero-power1();
      grid-row: 20 / span 6;
    }
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }

  .err-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
}
</style>
