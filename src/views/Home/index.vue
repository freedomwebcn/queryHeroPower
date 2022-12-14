<template>
  <div class="home-wrapper">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <h2 class="search-title">{{ getGreetingMsg() }}</h2>
      <van-search v-model="keyworld" placeholder="请输入英雄名称" :formatter="formatter" @focus="focus" @search="onSearch" />
      <div class="search-result-wrapper" v-if="filterSearchData && filterSearchData.length">
        <h5 class="result-title">搜索结果</h5>
        <div class="search-result-list">
          <template v-for="(item, index) in filterSearchData" :key="item.cname">
            <div class="search-result-item" @click="queryHeroPower(item)">
              <img :src="item.iconUrl" alt="" class="hero-img" />
              <div class="hero-name-wrapper">
                <span class="hero-name">{{ item.cname }}</span>
              </div>
            </div>
            <div class="van-hairline--bottom search-result-line" v-if="filterSearchData.length > 1 && index != filterSearchData.length - 1"></div>
          </template>
        </div>
      </div>
      <div class="search-history-wrapper" v-if="isShowSearchHistory && !keyworld">
        <h5 class="title">最近的搜索记录</h5>
        <div class="search-history-list">
          <template v-for="(item, index) in searchHistory" :key="item.cname">
            <van-swipe-cell @open="open" @close="close">
              <div class="swipe-cell-left" @click="queryHeroPower(item)">
                <img :src="item.iconUrl" alt="" />
                <span>{{ item && item.cname }}</span>
              </div>
              <template #right>
                <van-button square type="danger" text="删除" @click="deleteSearchHistoryItem(index)" />
              </template>
            </van-swipe-cell>
            <div class="van-hairline--bottom search-History-line" v-if="searchHistory.length > 1 && index != searchHistory.length - 1"></div>
          </template>
        </div>
        <div class="footer-wrapper">
          <span class="left-footer" @click="clearAllSearchHistory">清空最近的搜索记录</span>
          <span aria-label="左滑可删除单条搜索记录" data-balloon-pos="up-right">
            <van-icon name="question-o" class="right-ico" />
          </span>
        </div>
      </div>
      <div class="not-found-data" v-if="!filterSearchData.length && keyworld">暂无搜索结果</div>
    </div>
    <van-overlay :show="isShowOverlay" @click="overlayClose" />
    <!-- 英雄职业列表 -->
    <div class="hero-type-content">
      <h3 class="title">英雄职业</h3>
      <div class="hero-type-list">
        <div
          :style="{ backgroundColor: heroTypeItem.bgcolor }"
          class="hero-type-item"
          v-for="(heroTypeItem, index) in heroTypeList"
          :key="heroTypeItem.type"
          @click="getHeroList({ typeId: index + 1, typeName: heroTypeItem.type })"
        >
          <img :src="heroTypeItem.ico" class="ico" alt="" />
          <span class="type-name">{{ heroTypeItem.type }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { heroTypeList } from "./heroTypeList";
import { useReqHeroListData } from "@/views/HeroList/getHeroList";
import { Toast } from "vant";
import "vant/es/toast/style";

const router = useRouter();
const isShowOverlay = ref(false);
const keyworld = ref(""); //搜索关键字
const isShowSearchHistory = ref(false); //是否显示搜索历史记录
const { filterSearchData, getHeroData } = useReqHeroListData("", keyworld);
const swipeCellOpenStatus = ref(false); //根据单元格打开状态 决定是否要跳转路由 --如果单元格打开时，再次点击单元格是要关闭单元格，而不是跳转路由
getHeroData();
// 格式化搜索框输入的值 去除空白
const formatter = (value) => value.replace(/\s*/g, "");
const searchHistory = ref(JSON.parse(window.localStorage.getItem("serchHistory")) || []);

// 查询英雄战力
const queryHeroPower = (heroInfo) => {
  if (!swipeCellOpenStatus.value) {
    console.log(heroInfo);
    // 如果该条搜索记录已存在，则不添加 直接跳转路由去查询当前英雄战力
    const even = (searchHistoryObj) => searchHistoryObj.cname === heroInfo.cname;
    if (searchHistory.value.some(even)) {
      router.push({ path: "/search", query: { heroName: heroInfo.cname } });
      return;
    }
    // 保存搜索记录到数组中
    searchHistory.value.push(heroInfo);
    // 存储到本地
    window.localStorage.setItem("serchHistory", JSON.stringify(searchHistory.value));
    router.push({ path: "/search", query: { heroName: heroInfo.cname } });
  }
};

// 搜索框获取焦点时触发
const focus = () => {
  isShowOverlay.value = true;
  searchHistory.value.length > 0 ? (isShowSearchHistory.value = true) : (isShowSearchHistory.value = false);
};

// 点击遮盖层时触发
const overlayClose = () => {
  isShowOverlay.value = false;
  isShowSearchHistory.value = false;
  keyworld.value = ""; //输入英雄名称后没有点击查询英雄战力，而是点击遮盖层，则清空搜索框。
};

// 单元格打开触发
const open = () => {
  swipeCellOpenStatus.value = true;
};
// 单元格关闭触发
const close = () => {
  swipeCellOpenStatus.value = false;
};

// 删除搜索历史记录的某一项
const deleteSearchHistoryItem = (index) => {
  searchHistory.value.splice(index, 1);
  // 在pc端 点击删除按钮会调用close回调，在移动端不会调用，这里手动修改下状态，防止因为状态没有及时改变而不能跳转查询战力路由
  swipeCellOpenStatus.value = false;
  if (!searchHistory.value.length) {
    resetSearchHistoryStatus();
    return;
  }
  window.localStorage.setItem("serchHistory", JSON.stringify(searchHistory.value));
};
// 清空所有的搜索记录
const clearAllSearchHistory = () => {
  searchHistory.value = [];
  resetSearchHistoryStatus();
};
const resetSearchHistoryStatus = () => {
  window.localStorage.removeItem("serchHistory");
  isShowSearchHistory.value = false;
  isShowOverlay.value = false;
  Toast.success("清空成功！");
};

const onSearch = (val) => {
  console.log(val);
};
const getGreetingMsg = () => {
  const timeDate = new Date();
  const hours = timeDate.getHours();
  let greetingMsg = "";

  if (hours >= 0 && hours <= 5) {
    greetingMsg = "夜深了，注意休息";
  } else if (hours > 5 && hours <= 10) {
    greetingMsg = "早上好";
  } else if (hours > 10 && hours <= 11) {
    greetingMsg = "上午好";
  } else if (hours > 11 && hours <= 13) {
    greetingMsg = "中午好";
  } else if (hours > 13 && hours <= 18) {
    greetingMsg = "下午好";
  } else if (hours > 18 && hours <= 24) {
    greetingMsg = "晚上好";
  }
  return greetingMsg;
};

// 跳转到英雄职业所属的英雄列表页面
const getHeroList = (heroTypeObJ) => {
  router.push({ name: "heroList", params: { ...heroTypeObJ } });
};
</script>

<style lang="less" scoped>
@import "@/Mixins/dScrollBar";

.home-wrapper {
  height: 100%;
  padding: 16px 16px 16px 16px;
  background-image: linear-gradient(150deg, rgba(83, 83, 83, 0.8) 20px, transparent 220px);
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
          .van-field__left-icon {
            .van-icon-search {
              color: #000;
              font-size: 18px;
              font-weight: 700;
            }
          }
          .van-cell__value {
            .van-field__body {
              font-size: 14.5px;
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
      display: grid;
      row-gap: 8px;
      position: absolute;
      background-color: #f7f8fa;
      width: 100%;
      top: 72px;
      padding: 0px 12px 8px 12px;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;

      .result-title {
        font-size: 13px;
        color: #535353;
        margin: 10px 0;
      }

      .search-result-list {
        display: grid;
        row-gap: 8px;
        padding-bottom: 5px;

        .search-result-item {
          display: grid;
          grid-template-columns: 38px 1fr;
          grid-auto-rows: 38px;
          align-items: center;
          column-gap: 8px;

          .hero-img {
            height: 100%;
            border-radius: 3px;
          }

          .hero-name-wrapper {
            height: 100%;
            display: grid;
            font-size: 13px;
            align-items: center;
          }
        }

        .search-result-line {
          width: 274px;
          justify-self: end;
        }
      }
    }

    .search-history-wrapper {
      .search-result-wrapper();
      .search-history-list {
        .delete-scroll-bar();
        display: grid;
        row-gap: 8px;
        grid-auto-rows: max-content;
        max-height: 336px;
        overflow-y: scroll;
      }

      :deep(.van-swipe-cell) {
        //  height: 38px;
        .van-swipe-cell__wrapper {
          .swipe-cell-left {
            display: grid;
            grid-template-columns: 38px 1fr;
            grid-auto-rows: 38px;
            align-items: center;
            column-gap: 8px;

            img {
              height: 100%;
              border-radius: 3px;
            }

            span {
              font-size: 13px;
            }
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
        margin: 0;
        padding: 10px 0;
      }

      .search-History-line {
        width: 274px;
        justify-self: end;
      }

      .footer-wrapper {
        padding: 5px 0;
        color: rgb(185, 185, 185);
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .right-ico {
          transform: translate(-3px, 0);
        }
      }
    }

    .not-found-data {
      .search-result-wrapper();
      padding-top: 16px;
      padding-bottom: 16px;
      font-size: 15px;
      color: #535353;
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
  .treneding-topic-wrapper {
    .hero-type-content();
    .treneding-topic-list {
      .hero-type-list();
      .treneding-topic-item {
        .hero-type-item();
        .pic {
          .ico();
        }
        .name {
          .type-name;
        }
      }
    }
  }
}
</style>
