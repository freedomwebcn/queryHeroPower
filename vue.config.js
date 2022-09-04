const path = require('path')

const {
    VantResolver
} = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = {
    productionSourceMap: false, // 生产环境 sourceMap  
    css: { // 添加postcss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 37.5,
                        propList: ['*'],
                        exclude: /node_modules/i
                    }),
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
            // ui 框架按需引入配置
            ComponentsPlugin({
                resolvers: [VantResolver()],
            })
        ],

    },
    devServer: {
        disableHostCheck: true //解决内网穿透后无法访问项目的问题
    }
}