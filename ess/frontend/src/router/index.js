import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";

Vue.use(VueRouter);

// import는 일반 function과 같이 파라미터를 전달 받아 수행되지 않는다.
// 이는 아래와 같이 사용할 수 없다는 의미이다.
// const modulePath = "extensions/ExtensionPage";
// import(modulePath);
// 위와 같은 이유로 아래의 방식으로 모듈을 가져온다.
const getModule = async (container, component) => {
  const module = await window[container].get("./" + component);
  return module().default;
};

const getRouter = async () => {
  // 하기의 routes에는 ESS의 기본 사양에서 제공되는 기능들만 포함하도록 한다.
  let routes = [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ];

  try {
    const aEEndpoint =
      process.env.VUE_APP_APPLY_EXTENSIONS_ENDPOINT ||
      "http://localhost:8081/applyExtensions";

    let applyExtensions = false;
    const aERes = await axios.get(aEEndpoint);
    if (aERes.status == 200) {
      applyExtensions = aERes.data;
      console.log(applyExtensions);

      if (applyExtensions) {
        // 하기의 endpoint는 Extensions App 에 존재한다.
        const extensionsEndpoint =
          process.env.VUE_APP_EXTENSIONS_ENDPOINT ||
          "http://localhost:8082/extensionsRoutes";

        const resp = await axios.get(extensionsEndpoint);

        if (resp.status == 200) {
          // getModule function이 정상적으로 동작할 수 있는 전제 조건이 되는 부분이다.
          // Extensions app에서 expose 한 모듈을 document의 haed에 script tag로 포함시켜둔다.
          let tag = document.createElement("script");
          tag.setAttribute("src", "/extensions/Extensions.js");
          document.head.appendChild(tag);

          const extensions = resp.data;

          if (Array.isArray(extensions)) {
            resp.data.forEach((o) => {
              // route 요소를 생성할 때에 beforeEnter, prop 등을 어떻게 처리할지에 대한 고민이 필요하다.
              const route = {
                path: o.path,
                name: o.name,
                // 정식으로 module federation을 사용할 경우의 실제 사용 방식은 다음과 같다.
                // import("extensions/ExtensionPage")
                // 단, import(`${o.container}/${o.component}`) 와 같은 방식으로 parameter를 전달하여 모듈을 로드 할 수는 없다.
                // import expression상 불가능하지 않은 사용방식이나, webpack에서는 구현이 되어있지 않다고 한다.(22.04.28 기준)
                // 자세한 사항은 다음의 링크 참고: https://github.com/webpack/webpack/issues/12167
                // 추가로 Vite에 대한 기술조사도 필요해 보인다: https://vitejs.dev/, https://www.npmjs.com/package/vite-plugin-dynamic-import
                component: () => getModule(o.container, o.component),
              };
              routes.push(route);
            });
          }
        }
      }
    }
  } catch (e) {
    console.error("Failed to get extensions info.");
  }

  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });
};

export default await getRouter();
