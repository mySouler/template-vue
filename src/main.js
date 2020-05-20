import Vue from "vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "../static/css/base.css";
import "element-ui/lib/theme-chalk/index.css";
import axios from "./http/axios";
import App from "./App";

Vue.use(ElementUI);

Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   let token = sessionStorage.getItem("token");
//   if (!token && to.path != "/") {
//     next({
//       path: "/"
//     });
//   } else {
//     next();
//   }
// });

Vue.mixin({
  data() {
    return {
      add: false,
      DialogTitle: "",
      updateData: {},
      queryItems: {},
      chooseData: [],
      page: {
        size: 10,
        page: 1
      }
    };
  },
  methods: {
    getSize(val) {
      console.log(val, "mixin===getSize");
      this.page.size = val;
      this.callBack && this.callBack({ ...this.searhItems, ...this.page });
    },
    getPage(val) {
      console.log(val, "mixin===getPage");
      this.page.page = val;
      this.callBack && this.callBack({ ...this.searhItems, ...this.page });
    }
  }
});

/* eslint-disable no-new */
let myVue = new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");

Vue.directive("permission", {
  inserted: function(el, binding) {
    let { arg } = binding;
    if (!arg) {
      return;
    }
    console.log(myVue.userPermission, "=myVue.userPermission===arg");
    let hasPerssion = arg.replace(/-/g, ":");
    let result = myVue.userPermission.includes(hasPerssion);
    // console.log(result,'===d');
    if (!result) {
      el.parentNode ? el.parentNode.removeChild(el) : (el.innerText = "");
    }
  }
});

// document.title = '销售系统'
