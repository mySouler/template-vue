import Vue from "vue";
import VueRouter from "vue-router";
const Login = resolve => require(["@/views/Login"], resolve);
const Index = resolve => require(["@/views/Index"], resolve);
const home = resolve => require(["@/views/Home/Home"], resolve);
const depart = resolve => require(["@/views/Depart/index"], resolve);
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children: [
      {
        path: "",
        components: {
          home,
          depart
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
