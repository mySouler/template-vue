import axios from "axios";
import Qs from "qs";
import { Message } from "element-ui";
let instance = axios.create();
/*-----------------instance基本配置-----------*/
// instance.defaults.baseURL = 'http://192.168.16.54:8088/hz-finance';
// instance.defaults.baseURL = 'http://192.168.13.18:8080';

instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;

// let removePending = (config) => {
//   for (let p in pending) {
//     if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
//       pending[p].f(); //执行取消操作
//       pending.splice(p, 1); //把这条记录从数组中移除
//     }
//   }
// }

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    let token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + JSON.parse(token);
    }
    if (config.method === "get") {
      //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
      config.paramsSerializer = function(params) {
        return Qs.stringify(params, { arrayFormat: "indices" });
      };
    }
    config.cancelToken = new cancelToken(c => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url + "&" + config.method, f: c });
    });
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应
instance.interceptors.response.use(
  function(response) {
    // removePending(response.config);
    const data = response.data;
    return data;
  },
  function(err) {
    // 对响应错误做点什么
    if (err && err.response) {
      console.log("TCL:  err.response", err.response);
      switch (err.response.status || err.response.resp_code) {
        case 400:
          Message.error(err.response.data.resp_msg);
          break;
        case 401:
          Message.error(err.response.data.resp_msg);
          // setTimeout(function() {
          //   window.location.href = "/";
          // }, 1200);
          break;
        case 403:
          Message.error("code:" + err.response.status + ",拒绝访问");
          return;
        case 404:
          Message.error(err.response.data.resp_msg);
          break;
        case 408:
          Message.error("code:" + err.response.status + ",请求超时");
          break;
        case 500:
          Message.error(
            "code:" + err.response.status + "," + err.response.data.resp_msg
          );
          break;
        case 501:
          Message.error("code:" + err.response.status + ",服务未实现");
          break;
        case 502:
          Message.error("code:" + err.response.status + ",网关错误");
          break;
        case 503:
          Message.error("code:" + err.response.status + ",服务不可用");
          break;
        case 504:
          Message.error("code:" + err.response.status + ",网关超时");
          break;
        case 505:
          Message.error("code:" + err.response.status + ",HTTP版本不受支持");
          break;
        default:
      }
    }
    return Promise.reject(err);
  }
);
export default instance;

/*-----------------instance基本配置-----------*/
