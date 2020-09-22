module.exports = {
  devServer: {
    port: 3030, // 端口
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    disableHostCheck: true
  },
}