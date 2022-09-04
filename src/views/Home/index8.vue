<template>
    <van-swipe-cell >
        <van-card num="2" price="2.00" desc="描述信息" title="商品标题" class="goods-card"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        <template #right>
            <van-button square type="danger" text="删除" 
              />
        </template>
    </van-swipe-cell>

    <div class="home"></div>
</template>

<script setup>
// import { Toast } from 'vant';





</script>

<style lang="less" scoped>
.home{
    width: 375px;
    height: 200px;
    background-color: red;
}
</style>>

