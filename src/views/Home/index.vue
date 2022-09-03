<template>
  <div class="home-wrapper" id="test">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <h2 class="search-title">搜索</h2>
      <van-search v-model="keyworld" placeholder="搜索功能暂不可用" :formatter="formatter" @focus="focus" />
      <div class="search-result-wrapper" v-if="filterSearchData && filterSearchData.length">
        <ul class="search-result-list">
          <li class="search-result-item " v-for="(item, index) in filterSearchData" :key="item.cname"
            @click="queryHeroPower(item)">
            <img :src="item.iconUrl" alt="" class="hero-img">
            <div class="hero-name-wrapper">
              <span class="hero-name ">{{ item.cname }}</span>
              <div
                :class="{ 'van-hairline--bottom': filterSearchData.length > 1 && index != filterSearchData.length - 1 }">
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="search-history-wrapper" v-if="isShowSearchHistory && !keyworld">
        <h5 class="title">最近的搜索记录</h5>
        <template v-for="(item, index) in searchHistory" :key="item.cname">
          <van-swipe-cell>
            <img :src="item.iconUrl" alt="">
            <span>{{ item.cname }}</span>
            <template #right>
              <van-button square type="danger" text="删除" @click="deleteSearchHistoryItem(index)" />
            </template>
          </van-swipe-cell>
          <div class="van-hairline--bottom search-History-line"
            v-if="searchHistory.length > 1 && index != searchHistory.length - 1">
          </div>
        </template>
        <div class="footer-wrapper">
          <span class="footer" @click="clearAllSearchHistory">清空最近的搜索记录</span>
        </div>
      </div>
      <div class="not-found-data" v-if="!filterSearchData.length && keyworld">暂无搜索结果</div>
    </div>
    <van-overlay :show="isShowOverlay" @click="overlayClose" />

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
import { Toast } from 'vant';
import 'vant/es/toast/style';

const router = useRouter();
const isShowOverlay = ref(false)
const keyworld = ref('') //搜索关键字
const isShowSearchHistory = ref(false) //是否显示搜索历史记录
const { filterSearchData, getHeroData } = useReqHeroListData('', keyworld)
getHeroData()
// 格式化搜索框输入的值 去除空白
const formatter = (value) => value.replace(/\s*/g, "")
const searchHistory = ref(JSON.parse(window.localStorage.getItem("serchHistory")) || [])
const queryHeroPower = (heroInfo) => {
  // 如果该条搜索记录已存在，则不添加
  const even = (item) => item.cname === heroInfo.cname
  if (searchHistory.value.some(even)) {
    return
  }
  // 保存搜索记录到数组中
  searchHistory.value.push(heroInfo)
  // 存储到本地
  window.localStorage.setItem("serchHistory", JSON.stringify(searchHistory.value))
}

// 搜索框获取焦点时触发
const focus = () => {
  isShowOverlay.value = true
  searchHistory.value.length > 0 ? isShowSearchHistory.value = true : isShowSearchHistory.value = false
}

// 点击遮盖层时触发
const overlayClose = () => {
  isShowOverlay.value = false
  isShowSearchHistory.value = false
  keyworld.value = '' //输入英雄名称后没有点击查询英雄战力，而是点击遮盖层，则清空搜索框。
}
 
// 删除搜索历史记录的某一项
const deleteSearchHistoryItem = (index) => {
  searchHistory.value.splice(index, 1)
  if (!searchHistory.value.length) {
    isShowSearchHistory.value = false
    isShowOverlay.value = false
  }
  window.localStorage.setItem("serchHistory", JSON.stringify(searchHistory.value))
}
// 清空所有的搜索记录
const clearAllSearchHistory = () => {
  window.localStorage.removeItem("serchHistory");
  searchHistory.value = []
  isShowSearchHistory.value = false
  isShowOverlay.value = false
  Toast.success('清空成功');
}

// 跳转到英雄职业所属的英雄列表页面
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
    z-index: 2008;

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
      // z-index: 88;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;

      .search-result-list {
        display: grid;
        gap: 8px;

        .search-result-item {
          display: grid;
          grid-template-columns: 38px 1fr;
          grid-auto-rows: 38px;
          align-items: center;
          column-gap: 5px;

          .hero-img {
            height: 100%;
            border-radius: 3px;
          }

          .hero-name-wrapper {
            height: 100%;
            display: grid;
            align-items: end;
          }

        }
      }


    }

    .search-history-wrapper {
      .search-result-wrapper();
      display: grid;
      row-gap: 8px;

      :deep(.van-swipe-cell) {
        .van-swipe-cell__wrapper {
          display: grid;
          grid-template-columns: 38px 1fr;
          grid-auto-rows: 38px;
          align-items: center;
          column-gap: 8px;

          img {
            height: 100%;
            border-radius: 3px;
          }

          .van-swipe-cell__right {
            button {
              height: 100%;
            }
          }
        }

      }

      .title {
        font-size: 13px;
        color: rgb(83, 83, 83);
        margin: 10px 0;
      }

      .search-History-line {
        width: 274px;
        justify-self: end;
      }

      .footer-wrapper {
        padding: 5px 0;
        color: rgb(185, 185, 185);
        font-size: 13px;
      }

    }

    .not-found-data {
      .search-result-wrapper();
      text-align: center;
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

