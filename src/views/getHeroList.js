import {
    ref,
    computed,
} from 'vue';
import {
    reqHeroData
} from '@/api';
import {
    Notify
} from 'vant';

export function useReqHeroListData(typeId) {
    // 从本地存储读取数据
    let heroData = ref(JSON.parse(window.sessionStorage.getItem('allHeroData')) || []);
    let heroListLoadingErrStatus = ref(null); //英雄列表数据请求状态


    function toNotify() {
        Notify({
            type: 'danger',
            message: '数据请求失败,请重新尝试 !'
        });
    }
    const getHeroData = () => {
        // 如果sessionStorage 已经保存过英雄列表数据，就return
        if (heroData.value.length) return;

        reqHeroData().then(
            allHeroData => {



                console.log(allHeroData)
                // 本地存储数据
                window.sessionStorage.setItem(
                    'allHeroData',
                    JSON.stringify(allHeroData)
                );

                heroData.value = allHeroData;
            },
            err => {
                // 数据请求失败 显示错误提示
                console.log(err);
                toNotify();
                heroListLoadingErrStatus.value = err;
            }
        );
    };

    // 因为没有英雄职业对应的接口，现在用计算属性从所有英雄数据中过滤出来英雄职业对应的数据
    const filterHeroData = computed(() => {
        return heroData.value.filter(heroObj => {
            return heroObj.hero_type === typeId.value * 1;
        });
    });


    return {
        getHeroData,
        heroListLoadingErrStatus,
        filterHeroData
    }
}