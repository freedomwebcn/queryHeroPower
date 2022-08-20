<template>

  <div class="home-wrapper">
    <!-- 搜索框 -->
    <div class="search-wrapper">
      <h2 class="search-title">搜索</h2>
      <van-search v-model="keyworld" placeholder="搜索功能暂不可用" />
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
<script >
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { heroTypeList } from './heroTypeList'
export default {
  setup() {
    const router = useRouter();
    const keyworld = ref('');
    function getHeroList(heroTypeObJ) {
      router.push({ name: 'heroList', params: { ...heroTypeObJ } });
    }

    return {
      heroTypeList,
      getHeroList,
      keyworld
    };
  }
};
</script>
<style lang="less" scoped>
.home-wrapper {
  height: 100%;
  padding: 16px 16px 0 16px;
  background-image: linear-gradient(150deg,
      rgba(83, 83, 83, 0.8) 20px,
      transparent 220px);

  .search-wrapper {
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

