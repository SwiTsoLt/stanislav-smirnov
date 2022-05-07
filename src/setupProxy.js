const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://stanislav-smirnov-server.herokuapp.com',
      changeOrigin: true,
    })
  );
};