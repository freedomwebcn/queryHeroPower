import {
    ref,
} from 'vue';
import {
    reqHeroPower
} from '@/api';


export function useReqHeroPowerData(queryInfo) {
    let heroPowerData = ref(null); //英雄战力数据
    const isShowLoading = ref(false); //查询英雄战力期间 显示loading
    const heroPowerStatus = ref(null); //请求英雄战力数据的状态
    const isFadein = ref(false); 

    const getHeroPowerData = async (type) => {
        queryInfo.value.type = type || queryInfo.value.type;
        heroPowerData.value = null;
        isShowLoading.value = true;
        heroPowerStatus.value = null;
        try {
            heroPowerData.value = await reqHeroPower(queryInfo.value);
            isFadein.value = true;
        } catch (error) {
            heroPowerStatus.value = error;
            console.log(error);
        }
    };


    return {
        heroPowerData,
        isShowLoading,
        heroPowerStatus,
        isFadein,
        getHeroPowerData
    }
}