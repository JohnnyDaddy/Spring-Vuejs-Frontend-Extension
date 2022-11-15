# Introduction

External Jar를 Dloader option으로 불러들여 프론트 엔드의 페이지를 확장하는 간단한 샘플 코드.

Project root 경로 내의 각 디렉토리는 다음과 같이 상정한다.

- ess: Module Consumer

  devops ess repository의 master branch latest version

  - local dev Profile

        backend: 9091 port에서 실행
        frontend: 8080 port에서 실행

- extension: Module Provider

  각 site별 확장 기능

  - local dev Profile

        backend: 8082 port에서 실행
        frontend: 8081 port에서 실행

# Getting Started

<strong style="background-color: white; color: red">본 Sample은 vue-cli 5.0.4 version에서 작성되었으므로 이전 version의 vue project에 적용할 때에는 package.json 파일내에 명시된 각 package들의 version에 유의하기 바란다.</strong>

외부 모듈 로드에 관련된 자세한 내용은 다음의 repo를 참고할것.

https://dev.azure.com/dtonic/DEV_SampleCodes/_git/Spring%20External%20IF%20Module

# Build and Test

jar로 package가 완료된 extension application을 DLoder 옵션으로 불러들여
ess application을 실행한다.

- package

```
package.cmd
```

- run

```
java -Dloader.path="D:\CodeSamples\Spring Vuejs Frontend Extension\extension\backend\target\lg-0.0.1-SNAPSHOT-jar-with-dependencies.jar" -jar "D:\CodeSamples\Spring Vuejs Frontend Extension\ess\backend\target\ess-0.0.1-SNAPSHOT.jar"  --ess.applyExtensions=true
```

# Contribute

- 검토된 내용들

  1. single-spa:

     - https://single-spa.js.org/

  2. Webpack Module Federation:

     - https://webpack.kr/concepts/module-federation/

  3. Dynamic module import:

     - https://vitejs.dev/guide/features.html
     - https://www.npmjs.com/package/vite-plugin-dynamic-import
     - https://github.com/webpack/webpack/issues/12167

- 개선이 필요한 사항들

  1. 각 frontend bundle의 경량화.

     - Module Federation shared 추가 검토.

  2. Module Federation을 통해 remotes로 지정된 리소스의 동적 로딩.

     - 현재는 webpack에서 제안하는 모듈 import 방식을 사용중이지 않다.

       관련하여 Vite, 또는 Dynamic module import등의 토픽으로 관심을 기울이고 새로운 방안이 마련될 경우 적용이 필요함.

  3. routing의 구성

     - beforeEnter, prop 등과 관련하여 라우트 구성이 좀더 상세화 되어야 한다.
