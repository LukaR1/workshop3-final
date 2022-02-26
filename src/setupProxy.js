const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app){
    app.use(
        createProxyMiddleware("/api/shop",{
            target:"http://localhost:8080/",
            pathRewrite: {"^/api/shop": ""}
        })
    )
}