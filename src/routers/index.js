import Vuerouter from "vue-router";
import { Notification } from "element-ui";
import Cookies from "../api/Cookie.js";
import MenuLost from "@/pages/MenuLost.vue";
import MenuFind from "@/pages/MenuFind.vue";
import SendFind from "@/pages/SendFind.vue";
import UserList from "@/pages/UserList.vue";
import MineMsg from "@/pages/MineMsg.vue";
import BysjMain from "@/pages/Main.vue";
import TimeLine from "@/pages/TimeLine.vue";
//获取原型对象上的push函数
const originalPush = Vuerouter.prototype.push
//修改原型对象中的push方法
Vuerouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
const router = new Vuerouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: BysjMain,
    },
    {
      path: "/menuLost",
      name: "MenuLost",
      component: MenuLost,
    },
    {
      path: "/menuFind",
      name: "MenuFind",
      component: MenuFind,
    },
    {
      path: "/sendFind",
      name: "SendFind",
      component: SendFind,
      children: [
        {
          path: "timeLine",
          name: "TimeLine",
          component: TimeLine,
        },
      ],
    },
    {
      path: "/userList",
      name: "UserList",
      component: UserList,
    },
    {
      path: "/mineMsg",
      name: "MineMsg",
      component: MineMsg,
    },
  ],
});
//未登录拦截
router.beforeEach((to, from, next) => {
  if (!(to.name == "Main")) {
    if (Cookies.getCookies("token")) {
      next();
    } else {
      Notification({
        title: "警告",
        message: "您未登录!",
        type: "warning",
      });
      router.push('/')
    }
  } else {
    next();
  }
});
export default router;
