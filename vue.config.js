module.exports = {
    devServer: {
      proxy:'http://localhost/'
        // '^/event/':{
          // target:'http://localhost',
          // pathRewrite: {'^/event/':'/event/'},
          // changeOrigin: true,
          // logLevel:"debug"

        
      
  
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/hw_vue/'
    : '/'
  }