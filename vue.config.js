const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  lintOnSave: false,
  runtimeCompiler: false,
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("components", resolve("src/components"))
      .set("static", resolve("/static"));
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        disable: true,
        gifsicle: { interlaced: false },
        mozjpeg: { progressive: true, quality: 75 },
        optipng: { enabled: false },
        pngquant: { quality: "75-90", speed: 4 },
        webp: { quality: 75 }
      });
  },
  configureWebpack: config => {
    config.plugins.push(
      // 上线压缩去除console等信息
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ["console.log"] // 移除console
          }
        },
        sourceMap: false,
        parallel: true
      })
    );
  },
  devServer: {
    port: "8080",
    hot: true,
    open: true,
    proxy: {
      "/Api": {
        target: "http://192.168.13.29:7200",
        changeOrigin: true,
        pathRewrite: {
          "^/Api": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用"http://40.00.100.100:3002/user/add"，直接写‘/api/user/add’即可
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  }
};
