const { createProxyMiddleware } = require('http-proxy-middleware');

  module.exports = function(app ) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:44392',
        changeOrigin: true,
      })
    );
  };