    const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 7000
    },
    chainWebpack: config =>{
        config.plugin('html')
            .tap(args => {
                args[0].title = "机位预约管理系统";
                return args;
            })
    }
})
