<template>
    <div class="my" v-if="userInfo">
        <div class="user">
          <div class="left">
            <div class="img">
              <van-image :src="userInfo.avatar" round lazy-load></van-image>
            </div>
            <div class="info">
              <div class="name">
                <p>{{userInfo.nickname}}</p>
                <div class="id">
                  <span>ID: {{userInfo.uid}}</span>
                  <van-icon name="edit" />
                </div>
              </div>
              <div class="vip">
                <van-image :src="userInfo.vip_icon" round lazy-load></van-image>
                <span>{{userInfo.vip_name}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <van-icon name="setting-o" />
          </div>
        </div>
        <div class="mes">
          <div class="floor1">
            <ul>
              <li>
                <p class="t">我的余额</p>
                <p class="m">{{userInfo.now_money}}</p>
              </li>
              <li>
                <p class="t">当前佣金</p>
                <p class="m">{{userInfo.extractPrice}}</p>
              </li>
              <li>
                <p class="t">优惠劵</p>
                <p class="m">{{userInfo.extractTotalPrice}}</p>
              </li>
            </ul>
          </div>
          <div class="floor2">
            <div class="title">
              <p class="l">我的订单</p>
              <p class="r">全部订单<van-icon name="arrow" /></p>
            </div>
            <van-grid :column-num="5">
              <van-grid-item icon="pending-payment" :badge="userInfo.orderStatusNum.unpaid_count" text="待付款" />
              <van-grid-item icon="certificate" :badge="userInfo.orderStatusNum.order_count" text="待发货" />
              <van-grid-item icon="logistics" :badge="userInfo.orderStatusNum.complete_count" text="待收货" />
              <van-grid-item icon="comment-o" :badge="userInfo.orderStatusNum.evaluated_count" text="待评价" />
              <van-grid-item icon="after-sale" :badge="userInfo.orderStatusNum.refund_count" text="售后" />
            </van-grid>
          </div>
          <div class="floor3">
            <div class="title">我的服务</div>
             <van-grid :column-num="4">
              <van-grid-item icon="user-o"  text="会员中心" />
              <van-grid-item icon="gift-o"  text="砍价记录" />
              <van-grid-item icon="friends-o"  text="我的推广" />
              <van-grid-item icon="gold-coin-o"  text="我的余额" />
              <van-grid-item icon="location-o"  text="地址信息" />
              <van-grid-item icon="star-o"  text="我的收藏" />
              <van-grid-item icon="coupon-o"  text="优惠劵" />
              <van-grid-item icon="service-o"  text="联系客服" />
            </van-grid>
          </div>
          <!-- 退出登录  -->
          <van-button type="primary" round large block color="#e93323" @click="logOut">退出登录</van-button>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: 'My',
  data(){
    return{
      userInfo:null,
    }
  },
  components: {
  },
  created(){
    this.userInfo = this.$store.getters.loginUser;
    if(this.userInfo == null){
      this.$router.push('/login');
    }
  },
  computed:{
    ...mapGetters(['loginUser']),
  },
  methods:{
    // 退出登录
    logOut(){
      this.loginOut();
      this.$toast({
        message:'已退出登录',
        onClose:()=>{
          this.$router.push('/login');
        },
      });
    },
    ...mapMutations(['saveToken','saveLoginInfo','loginOut']),
  },
}
</script>

<style lang="less">
p{
  margin: 0;
  font-size: 16px;
}
.my{
  background: #ededed;
  min-height: 100vh;
  padding-bottom: 40px;
  .user{
    background: #e93323;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 0;
    .left{
      display: flex;
      align-items: center;
      .img{
        img{
          height: 50px;
          width: 50px;
          border: solid 2px rgba(255, 255, 255, 0.795);
        }
      }
      .info{
        // border: solid 1px white;
        display: flex;
        font-size: 15px;
        margin-left: 20px;
        height: 46px;
        p{
          margin: 0;
        }
        .name{
          p{
            font-weight: bold;
            color: white;
          }
          .id{
            color: rgba(255, 255, 255, 0.575);
            margin-top: 4px;
            font-size: 13px;
            i{
              margin-left: 6px;
            }
          }
        }
        .vip{
          height: 18px;
          overflow: hidden;
          border-radius: 10px;
          background-color: #ba291c;
          padding: 0 4px;
          img{
            height: 10px;
            width: 10px;
          }
          span{
            font-size: 12px;
            display: inline-block;
            margin-left: 2px;
            color: rgba(255, 255, 255, 0.829);
          }
        }
      }
    }
    .right{
      i{
        font-size: 17px;
        color: white;
      }
    }
    &::after{
      content: '';
      height: 60px;
      width: 100vw;
      position: absolute;
      bottom: -30px;
      background: #e93323;
      margin-left: -20px;
      border-radius: 50%;
      z-index: -1;
    }
  }
  .mes{
    position: relative;
    z-index: 0;
    padding: 0 20px;
    padding-bottom: 20px;
    .floor1{
      // border: solid 1px #000;
      background: white;
      border-radius: 4px;
      ul{
        display: flex;
        padding: 6px 0;
        li{
          flex: 1;
          p{
            text-align: center;
            margin: 0;
            font-size: 16px;
          }
          &:nth-child(2){
            border-left: 1px rgba(204, 204, 204, 0.356) solid;
            border-right: 1px rgba(204, 204, 204, 0.356) solid;
          }
          .t{
            color: #c7c5c5;
            font-size: 12px;
          }
          .m{
            margin-top: 4px;
          }
        }
      }
    }
    .floor2{
      background-color: white;
      margin: 10px 0;
      border-radius: 4px;
      .title{
        display: flex;
        padding: 6px;
        justify-content: space-between;
        .l{
          font-size: 14px;
        }
        .r{
          font-size: 12px;
          display: flex;
          align-items: center;
          color: #9d9d9d;
        }
      }
      .van-icon{
        color: #ff5345;
      }
      .van-info{
        background-color: white;
        border: solid .5px red;
        color: #ff5345;
      }
    }
    .floor3{
      background-color: white;
      border-radius: 4px;
      margin: 10px 0;
      .title{
        padding: 6px;
        font-size: 14px;
      }
      .van-icon{
        color: lighten(#ff5345,10%);
      }
    }
    .van-button{
      font-weight: bold;
    }
  }
}
</style>