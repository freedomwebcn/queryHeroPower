<template>
  <div class="home-wrapper">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <h2 class="search-title">搜索</h2>
      <van-search v-model="keyworld" placeholder="请输入搜索关键词" />
      <!-- <div class="search-content">
          <div class="search">
            <div class="search-cell">
              <div class="search-cell-left-icon">
                <i class="van-badge__wrapper van-icon van-icon-search"></i>
              </div>

              <div class="search-cell-value">
                <div class="search-cell-value-body">
                  <input type="search" id="van-search-1-input" class="search-value-input" placeholder="请输入英雄名称">
                </div>
              </div>
            </div>
          </div>
        </div> -->
    </div>
    <!-- 英雄职业列表 -->
    <div class="hero-type-content">
      <h3 class="title">英雄职业</h3>
      <div class="hero-type-list">
        <div :style="{backgroundColor: heroTypeItem.bgcolor}" class="hero-type-item"
          v-for="(heroTypeItem,index) in heroTypeList" :key="heroTypeItem.type"
          @click='queryHeroList({typeId:index+1,typeName:heroTypeItem.type})'>
          <img :src="heroTypeItem.ico" class="ico" alt="">
          <span class="type-name">{{heroTypeItem.type}}</span>
        </div>
      </div>
    </div>
  </div>

</template>
<script >
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: {},
  setup() {
    const router = useRouter();
    const keyworld = ref('');
    const heroTypeList = [
      {
        type: '战士',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg',
        bgcolor: 'rgb(39, 133, 106)'
      },
      {
        type: '法师',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg',
        bgcolor: 'rgb(232, 17, 91)'
      },
      {
        type: '坦克',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg',
        bgcolor: 'rgb(141, 103, 171)'
      },
      {
        type: '刺客',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg',
        bgcolor: 'rgb(245, 155, 35)'
      },
      {
        type: '射手',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg',
        bgcolor: 'rgb(13, 115, 236)'
      },
      {
        type: '辅助',
        ico: 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg',
        bgcolor: 'rgb(235, 30, 50)'
      }
    ];
    function queryHeroList(heroTypeObJ) {
      router.push({ name: 'heroList', params: { ...heroTypeObJ } });
    }

    return {
      heroTypeList,
      queryHeroList,
      keyworld
    };
  }
};
</script>
<style lang="less" scoped>
.home-wrapper {
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: linear-gradient(
    150deg,
    rgba(83, 83, 83, 0.8) 20px,
    transparent 220px
  );
  // overflow: hidden;
  .search-wrapper {
    .search-title {
      font-size: 18px;
      color: white;
      margin-top: 0;
    }
    .search-content {
      //   padding: 0 12px;
      //   background-color: red;

      height: 39px;

      .search {
        display: flex;
        height: 100%;
        padding-left: 12px;
        background: rgb(247, 248, 250);
        border-radius: 2px;
        .search-cell {
          flex: 1;
          display: flex;
          padding: 5px 5px 5px 0;

          background-color: transparent;
          .search-cell-left-icon {
            font-size: 16px;
            margin-right: 4px;
            display: flex;
            align-items: center;
            color: rgb(150, 151, 153);
            .van-icon-search {
              display: block;

              line-height: inherit;
              font-size: 16px;
            }
          }
          .search-cell-value {
            color: rgb(50, 50, 51);
            text-align: left;
            flex: 1;
            display: flex;
            // align-items: center;
            .search-cell-value-body {
              display: flex;
              //   align-items: center;
              width: 100%;
              height: 100%;
              .search-value-input {
                display: block;
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                min-width: 0;
                margin: 0;
                padding: 0;
                color: rgb(50, 50, 51);
                text-align: left;
                background-color: transparent;
                border: 0;
                resize: none;
                user-select: auto;
                // font: -webkit-control;
                font-size: 14px;
                &::-webkit-search-cancel-button {
                  display: none;
                }
              }
            }
          }
        }
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
      grid-template-rows: repeat(3, 92px [row-start]);
      grid-column-gap: 16px;
      grid-row-gap: 16px;
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

