import Vue from "vue";
import Vuex from "vuex";
import Cookies from "../api/Cookie.js";
Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
  state: {
    isManerger: localStorage.getItem("isManerger")||-1,
    userId: localStorage.getItem("userId")||-1,
  },
  mutations: {
    // 登录
    login(state, user) {
      state.isManerger = user.ismanager;
      state.userId = user.userId;
      localStorage.setItem("isManerger", user.ismanager);
      localStorage.setItem("userId", user.id);
      Cookies.setCookies("token", true, 3600);
    },
    // 退出
    logout(state) {
      state.isManerger = 1;
      state.userId = 0;
      localStorage.clear();
      Cookies.removeCookies("token");
    },
  },
});
