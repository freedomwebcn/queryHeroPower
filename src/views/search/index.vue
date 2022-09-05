<template>

    <div class="search-wrapper">
        <header>
            <van-icon name="arrow-left" class="ico" @click="$router.back()" />
        </header>
        <div class="search-content">
            <div class="search-title van-hairline--bottom">
                <span>区服</span>
                <span>地区</span>
                <span>分数</span>
            </div>


            <template v-for="(item,index) in searchData " :key="item.name">
                <div :class="`service${index+1} van-hairline--bottom`">
                    <template v-for="(type,tyIndex) in dctype" :key="type">
                        <span class="service1-span" v-if="index == tyIndex">{{type}}</span>
                    </template>
                    <div class="service1-div">
                        <span>{{item.province}}</span>
                        <span>{{item.provincePower}}</span>
                    </div>
                    <div class="service1-div">
                        <span>{{item.city}}</span>
                        <span>{{item.cityPower}}</span>
                    </div>
                    <div class="service1-div">
                        <span>{{item.area}}</span>
                        <span>{{item.areaPower}}</span>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import {
    reqHeroPowerAqq,
    reqHeroPowerAwx,
    reqHeroPowerIqq,
    reqHeroPowerIwx
} from '@/api';
// import {
//     Notify
// } from 'vant';


const route = useRoute()
const heroName = route.query.heroName
const searchData = ref ()
async function getSearchData(){
    console.log(66);
    try {
          const data = await Promise.all([reqHeroPowerAqq({heroName}), reqHeroPowerAwx({heroName}),reqHeroPowerIqq({heroName}),reqHeroPowerIwx({heroName})])
          searchData.value = data
        } catch (error) {
        console.log(error);
        
    }
}
getSearchData()
const dctype = ["安卓QQ","安卓WX","苹果QQ","苹果WX"]
  

    
</script>


<style lang="less" scoped>
.search-wrapper {
    width: 100%;
    height: 100%;

    header {
        width: 100%;
        position: fixed;
        z-index: 66;
        padding: 16px 10px;

        .ico {
            color: white;
            font-size: 25px;
        }
    }

    .search-content {
        width: 100%;
        height: 100%;
        padding: 57px 16px 0 16px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        color: white;
        text-align: center;

        .search-title {
            display: grid;
            grid-column: 1 / 4;
            align-items: center;
            grid-template-columns: 1fr 1fr 1fr;
            font-size: 16px;
        }

        .service1 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: repeat(3, 1fr);
            grid-column: 1 / 4;
            grid-row: 2 / span 6;
            font-size: 15px;

            .service1-span {
                align-self: center;
                grid-row: 1 / span 3;
            }

            .service1-div {
                display: grid;
                align-self: center;
                grid-template-columns: 1fr 1fr;
                grid-column: 2 / 4;
                align-items: end;

            }
        }

        .service2 {
            .service1();
            grid-row: 8 / span 6;

        }

        .service3 {
            .service1();
            grid-row: 14 / span 6;
        }

        .service4 {
            .service1();
            grid-row: 20 / span 6;
        }
    }
}
</style>