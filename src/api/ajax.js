import axios from 'axios'
const instance = axios.create({
    baseURL: 'https://www.sapi.run/',
    timeout: 8000,
});

instance.interceptors.request.use(function (config) {
    return config;
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response.data.data

}, function (error) {
    console.log(error);
    return Promise.reject(error.message)
});


export default instance