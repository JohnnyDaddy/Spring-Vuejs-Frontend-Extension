const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  configureWebpack: {
    plugins: [
      // 아래의 주석된 내용은 정식으로 Module Federation을 통해 원격의 모듈을 가져와서 사용하는 방식이다.
      //
      // new ModuleFederationPlugin({
      //   name: "ESS",
      //   filename: "ESS.js",
      //   remotes: {
      //     extensions: "extensions@/extensions/Extensions.js",
      //   },
      // }),
    ],
    experiments: {
      // roter index.js 내에서 axios를 통해 추가된 routes를 포함 시키는 동작을 수행하기 위해 아래의 옵션을 포함한다.
      topLevelAwait: true,
    },
  },
  devServer: {
    port: 8080,
  },
});
