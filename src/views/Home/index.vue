<template>
  <div class="home-wrapper">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <h2 class="search-title">搜索</h2>
      <van-search v-model="keyworld" placeholder="搜索功能暂不可用" @update:model-value="filterData" />
      <div class="search-result-wrapper">
        <ul class="search-result-list">
          <li class="search-result-item " v-for="(item, index) in searchResult" :key="item.cname">
            <img :src="item.iconUrl" alt="" class="hero-img">
            <div class="hero-name-wrapper">
              <span class="hero-name ">{{ item.cname }}</span>
              <div
                :class="{ 'van-hairline--bottom': searchResult.length > 1 && index != searchResult.length - 1 }">
              </div>
            </div>
          </li>
        </ul>
        <div class="not-found-data" v-if="queryStatus">暂无搜索结果</div>
      </div>
    </div>
    <!-- 英雄职业列表 -->
    <div class="hero-type-content">
      <h3 class="title">英雄职业</h3>
      <div class="hero-type-list">
        <div :style="{ backgroundColor: heroTypeItem.bgcolor }" class="hero-type-item"
          v-for="(heroTypeItem, index) in heroTypeList" :key="heroTypeItem.type"
          @click='getHeroList({ typeId: index + 1, typeName: heroTypeItem.type })'>
          <img :src="heroTypeItem.ico" class="ico" alt="">
          <span class="type-name">{{ heroTypeItem.type }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { heroTypeList } from './heroTypeList'
import { useReqHeroListData } from '@/views/HeroList/getHeroList';

const router = useRouter();
const keyworld = ref('');
const searchResult = ref();
const queryStatus = ref(false);

const filterData = (newKeyworld) => {
  if (newKeyworld.replace(/\s*/g, "")) {
    const { filterSearchData } = useReqHeroListData("", newKeyworld)
    searchResult.value = filterSearchData.value
    searchResult.value.length > 0 ? queryStatus.value = false : queryStatus.value = true
    return
  }
  searchResult.value = []
  queryStatus.value = false
}

const getHeroList = (heroTypeObJ) => {
  router.push({ name: 'heroList', params: { ...heroTypeObJ } });
}

</script>
<style lang="less" scoped>
.home-wrapper {
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: linear-gradient(150deg,
      rgba(83, 83, 83, 0.8) 20px,
      transparent 220px);

  .search-wrapper {
    position: relative;

    .search-title {
      font-size: 18px;
      color: white;
      margin-top: 0;
    }

    :deep(.van-search) {
      border-radius: 3px;
      padding: 0;

      .van-search__content {
        .van-search__field {
          height: 38px;
          align-items: center;

          .van-field__left-icon {
            .van-icon-search {
              color: #000;
              font-size: 18px;
              font-weight: 700;
            }
          }

          .van-cell__value {
            .van-field__body {
              input::placeholder {
                font-weight: 700;
                color: rgb(83, 83, 83);
              }
            }
          }
        }
      }
    }

    .search-result-wrapper {
      position: absolute;
      background-color: #f7f8fa;
      width: 100%;
      top: 76px;
      padding: 0px 12px 6px 12px;
      z-index: 88;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;

      .search-result-list {
        display: grid;
        gap: 6px;

        .search-result-item {
          display: grid;
          grid-template-columns: 32px 1fr;
          align-items: center;
          column-gap: 5px;

          .hero-img {
            height: 32px;
            border-radius: 3px;
          }

          .hero-name-wrapper {
            height: 32px;
            display: grid;
            align-items: end;
          }

        }
      }

      .not-found-data {
        text-align: center;


      }
    }
  }

  .hero-type-content {
    .title {
      font-size: 16px;
      color: white;
    }

    .hero-type-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, 92px);
      gap: 16px;

      .hero-type-item {
        border-radius: 4px;
        padding: 10px;
        position: relative;
        overflow: hidden;

        .ico {
          height: 56px;
          width: 56px;
          position: absolute;
          bottom: 0;
          right: 0;
          transform: rotate(25deg) translate(18%, -2%);
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
        }

        .type-name {
          color: white;
          font-size: 16px;
        }
      }
    }
  }
}
</style>>

