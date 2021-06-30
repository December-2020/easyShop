<template>
  <div id="app">
    <van-tabbar  active-color="#e31d1a" inactive-color="#9a9a9a" route v-show="!$route.meta.hideNav">
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    
    <van-overlay :show="showLoading">
      <div class="wraper-loading">
        <van-loading type="spinner" size="40" vertical>正在加载</van-loading>
      </div>
    </van-overlay>
    
    <keep-alive>
      <router-view/>
    </keep-alive>

    <div class="pictureBox"  :style="{bottom:`${mTop}px`}">
      <div class="picture" ref="box">
        <img 
          :src="showIcon?'http://47.115.51.185/h5/img/close.446e8669.gif':'http://47.115.51.185/h5/img/open.7da41017.gif'" 
          alt="" 
          @click="showArr"
        >
      </div>
      <div class="box" v-show="showIcon">
        <van-icon name="wap-home-o" @click="goIndex" color="#fff"/>
        <van-icon name="shopping-cart-o" @click="goCart" color="#fff"/>
        <van-icon name="contact" @click="goMy" color="#fff"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed:{
    ...mapState(['showLoading'])
  },
  data(){
    return{
      showIcon:false,
      mTop:60,
      originY:0,
    }
  },
  mounted(){
    // this.$refs.box.addEventListener('touchstart',this.start);
  },
  methods:{
    showArr(){
      this.showIcon = !this.showIcon;
    },
    goIndex(){
      this.$router.push('/');
    },
    goCart(){
      this.$router.push('/cart');
    },
    goMy(){
      this.$router.push('/my');
    },
  },
}
</script>

<style lang="less">
#app{
  position: relative;
  .wraper-loading{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pictureBox{
    position: fixed;
    z-index: 99;
    height: 60px;
    width: 65px;
    // background-color: red;
    // border: solid 1px red;
    right: 10px;
    .picture{
      height: 43px;
      width: 43px;
      transform: rotateZ(90deg);
      img{
        width: 100%;
        height: 100%;
      }
    }
    .box{
      // border: solid 1px blue;
      position: absolute;
      left: -140px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 129px;
      height: 43px;
      top: 0px;
      border-radius: 20px;
      background-color: #f44939;
    }
  }

}
</style>
