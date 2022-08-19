import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://api.vopipi.cn/api/',
    timeout: 8000,
});


instance.interceptors.request.use(function (config) {
    return config;
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {

    if (response.data.code === 200) {
        return response.data.data[0]
    } else {
        return Promise.reject(response.data.msg)
    }

}, function (error) {
    console.log(error);
    return Promise.reject(error.message)
});


export default instance