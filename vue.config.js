module.exports = {
    devServer: {
      proxy:'http://localhost:8888/'
        // '^/event/':{
          // target:'http://localhost',
          // pathRewrite: {'^/event/':'/event/'},
          // changeOrigin: true,
          // logLevel:"debug"

        
      
  
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_calendar/'
    : '/'
  }