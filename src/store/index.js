import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading:false,
    loginInfo:null,
    login:false,
    token:null,
  },
  getters:{
    tokens(state){
      let s= state.token;
      // 判断vuex的state中有没有token
      if(!s){
        // 去sessionStorage中取
        s = sessionStorage.getItem('token');
        if(!s){
          // 截取token获取取出token值
          s=document.cookie.substr(6)
        }
      }
      return s;
    },
    // 获取登录用户的数据信息
    loginUser(state){
      let u = state.loginInfo;
      if(!u){
        let a = sessionStorage.getItem('loginfo');
        u = JSON.parse(a);
      }
      return u;
    },
  },
  mutations: {
    changeLoading(state,payload){
      state.showLoading=payload;
    },
     // 存入token
     saveToken(state,payload){
      state.token = payload;
      document.cookie = "token=" + payload;
      sessionStorage.setItem('token',payload);
    },
    // 保存登录用户信息
    saveLoginInfo(state,payload){
      state.loginInfo=payload;
      let loginfo = JSON.stringify(payload);
      document.cookie = "loginfo=" + loginfo;
      sessionStorage.setItem('loginfo',loginfo);
    },
    // 退出登录
    loginOut(state){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('loginfo');
      document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      document.cookie = 'loginfo=;expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      state.loginInfo = null;
      state.token = null;
    },
  },
  actions: {
    getLoginInfo(context){
      // ajax获取登录数据
      axios.get('api/user',{
        // 请求前的前置处理
        // headers:{
        //   'Authori-zation':'Bearer '+payload
        // }
      }).then(d => {
        // 登录数据获取成功存储vuex或sessionStorage
        context.commit('saveLoginInfo',d.data.data);
      })
    },
  },
  modules: {
  }
})
