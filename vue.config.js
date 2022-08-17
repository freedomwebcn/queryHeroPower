const path = require('path')
const px2rem = require('postcss-px2rem')
// 配置postcs-px2rem
const postcss = px2rem({
    remUnit: 37.5 // 设计稿10等分之后的值 （假设是375的设计稿）
})
const {
    VantResolver
} = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = {
    // lintOnSave: false,
    css: { // 添加postcss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },
    configureWebpack: { // 内部写webpack原生配置
        resolve: {
            extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
            alias: { // 路径别名(简写方式)
                // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
                '@': path.resolve(__dirname, 'src'),
                '@components': path.resolve(__dirname, 'src/components'),
            }
        },
        plugins: [
            // ...
            ComponentsPlugin({
                resolvers: [VantResolver()],
            })
        ]
    },
    devServer: {
        disableHostCheck: true //解决内网穿透后无法访问项目的问题
    }
}