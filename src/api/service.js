import axios from 'axios'
const service = axios.create({
    timeout: 8000,
});


service.interceptors.request.use(function (config) {
    return config;
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response)
    return response.data
}, function (error) {
    console.log(error);
    return Promise.reject(error.message)
});


export default service