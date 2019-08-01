const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // 基本路径
  baseUrl: "./",
  // 输出文件目录
  outputDir: "dist",
  // webpack-dev-server 相关配置
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
        open: process.platform === 'darwin',
        // host: '127.0.0.1',
        port: 8889,
        https: false,
        hotOnly: false,
        proxy: {
        '/api': {
                target: "http://192.168.3.207:83",
                ws:true,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'/'
                }
            }
        }, // 设置代理
        before: app => {}
    }
};
