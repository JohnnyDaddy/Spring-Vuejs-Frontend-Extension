const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  // 향후 static resource를 찾는 기준이 된다.
  publicPath: "./extensions/",
  configureWebpack: {
    plugins: [
      // Module Federation을 통한 Component expose
      // npm build 시 ${빌드경로}/Extensions.js 파일이 생성된다.
      new ModuleFederationPlugin({
        // 모듈의 이름으로 Module federation을 통해 remote에서 모듈을 참조할 때에 아래의 이름이 사용된다.
        name: "extensions",
        filename: "Extensions.js",
        exposes: {
          // import("extensions/ExtensionPage")와 같은 사용이 가능해지도록 모듈을 내보낸다.
          // extensions => name, ExtensionPage => 아래 내용의 좌항.
          "./ExtensionPage": "./src/components/ExtensionPage",
        },
      }),
    ],
  },
  devServer: {
    port: 8081,
  },
});
