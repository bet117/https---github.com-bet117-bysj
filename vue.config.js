module.exports = {
  publicPath: "./",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      "/api": {
        changeOrigin: true, //开启代理:在本地会创建一个虚拟服务端，然后发送请求数据
        target: "http://localhost:8081",
      },
    },
  },
};
