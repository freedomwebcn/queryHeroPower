import {
    ref,
} from 'vue';
import {
    reqHeroPower
} from '@/api';
import {
    Notify
} from 'vant';

export function useReqHeroPowerData(queryInfo) {
    let heroPowerData = ref(null); //英雄战力数据
    let isShowLoading = ref(false); //查询英雄战力期间 显示loading
    let heroPowerStatus = ref(null); //请求英雄战力数据的状态

    let getHeroPowerData = async (type) => {
        console.log(type,"22222");
        queryInfo.value.type = type || queryInfo.value.type;
        heroPowerData.value = null;
        isShowLoading.value = true;
        heroPowerStatus.value = null;
        try {
            heroPowerData.value = await reqHeroPower(queryInfo.value);
        } catch (error) {
            heroPowerStatus.value = error;
            Notify({
                message: '如果你的网络开启了代理,请先关闭代理 !',
                duration: 3000,
            });
            console.log(error, 'err');
        }
    };


    return {
        heroPowerData,
        isShowLoading,
        heroPowerStatus,
        getHeroPowerData
    }
}