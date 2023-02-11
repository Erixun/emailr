const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/**", "/auth/google"],
    createProxyMiddleware({
      target: "http://0.0.0.0:5000",
    })
  );
};
