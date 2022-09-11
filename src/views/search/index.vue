<template>
  <van-config-provider :theme-vars="searchthemeVars" style="height:100%">
    <div class="search-wrapper">
      <header>
        <van-icon name="arrow-left" class="ico" @click="$router.back()" />
      </header>
      <div class="search-content" v-if="searchData && searchData.length">
        <div class="search-title van-hairline--bottom">
          <span>区服</span>
          <span>地区(省/市/区标)</span>
          <span>分数</span>
        </div>
        <template v-for="(item, index) in searchData" :key="item.name">
          <div :class="`hero-power${index + 1} animate__animated animate__fadeInLeft ${index === searchData.length - 1 ? '' : 'van-hairline--bottom'}`">
            <template v-for="(type, tyIndex) in dctype" :key="type">
              <span class="dctype" v-if="index == tyIndex">{{ type }}</span>
            </template>
            <div class="district-score">
              <span>{{ item.province }}</span>
              <span>{{ item.provincePower }}</span>
            </div>
            <div class="district-score">
              <span>{{ item.city }}</span>
              <span>{{ item.cityPower }}</span>
            </div>
            <div class="district-score">
              <span>{{ item.area }}</span>
              <span>{{ item.areaPower }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="loading" v-if="!searchData.length && errStatus == null">
        <van-loading type="spinner" color="#fff" />
      </div>
      <div class="err-wrapper" v-if="errStatus" @click="getSearchData">
        <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" style="color: white" />
      </div>
    </div>
  </van-config-provider>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import { reqHeroPowerAqq, reqHeroPowerAwx, reqHeroPowerIqq, reqHeroPowerIwx } from "@/api";
import { searchthemeVars } from "@/ui_option";

const route = useRoute();
const heroName = route.query.heroName;
const searchData = ref([]);
const dctype = ["安卓QQ", "安卓WX", "苹果QQ", "苹果WX"];
const errStatus = ref(null);

async function getSearchData() {
  try {
    errStatus.value = null;
    const data = await Promise.all([reqHeroPowerAqq({ heroName }), reqHeroPowerAwx({ heroName }), reqHeroPowerIqq({ heroName }), reqHeroPowerIwx({ heroName })]);
    searchData.value = data;
  } catch (error) {
    errStatus.value = error;
    console.log("search-err-msg ------", error);
  }
}
getSearchData();
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  &::after {
    content: "";
    position: absolute;
    background: url(../img/56.png) center center no-repeat;
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

  .search-content {
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

    .search-title {
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

      .district-score {
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