<template>
  <div class="popup-content">
    <h5 class="popup-hero-ico">
      <img :src="heroImgUrl" alt="" class="animate__animated animate__headShake" />
    </h5>
    <div class="tab-wrapper">
      <span style="display: inline-block" @click="$emit('getPopupData', tabItem.systemType)" v-for="tabItem in tabList" :key="tabItem" :class="{ active: tabItem.systemType === queryInfo.type }">
        {{ tabItem.systemName }}
      </span>
    </div>
    <div class="van-hairline--top hairline"></div>
    <div class="hero-power-wrapper">
      <div class="hero-power-content">
        <template v-if="heroPowerData">
          <div class="district-wrapper animate__animated animate__fadeIn">
            <div class="district-content">
              <span class="reward">省级</span>
              <span class="district">{{ heroPowerData.province }}</span>
              <span class="score">{{ heroPowerData.provincePower + "分" }}</span>
            </div>
            <div class="district-content">
              <span class="reward">市级</span>
              <span class="district">{{ heroPowerData.city }}</span>
              <span class="score">{{ heroPowerData.cityPower + "分" }}</span>
            </div>
            <div class="district-content">
              <span class="reward">区级</span>
              <span class="district">{{ heroPowerData.area }}</span>
              <span class="score">{{ heroPowerData.areaPower + "分" }}</span>
            </div>
          </div>
          <div class="update-time-wrapper" v-if="heroPowerData">
            <span class="update-time">数据更新时间:{{ heroPowerData.updatetime }}</span>
          </div>
        </template>
        <div class="hero-power-content-loading" v-else-if="isShowLoading && heroPowerStatus === null">
          <van-loading size="24px" vertical>加载中...</van-loading>
        </div>
        <van-empty image="error" image-size="100" description="数据加载失败, 点击重新尝试 !" v-if="heroPowerStatus" @click="$emit('getPopupData', null)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { tabList } from "../tabList";

defineProps({
  heroImgUrl: String,
  heroPowerData: Object,
  isShowLoading: Boolean,
  heroPowerStatus: [Object, String],
  queryInfo: Object,
});
</script>

<style lang="less" scoped>
.popup-content {
  width: 280px;
  height: 280px;
  padding: 12px;

  .popup-hero-ico {
    display: flex;
    justify-content: center;
    font-size: 16px;
    margin: 5px 0;

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
      @media screen and (max-width: 320px) {
        :deep(.van-empty) {
          .van-empty__description {
            margin: 0;
          }
        }
      }

      .district-wrapper {
        padding: 15px 3px 12px 3px;
        display: grid;
        grid-row-gap: 20px;
        font-size: 13px;

        .district-content {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr;

          .score {
            justify-self: end;
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
}
</style>
