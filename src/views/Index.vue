<template>
  <div class="index">
    <!-- 搜索开始 -->
    <div class="search">
        <van-image :src="logoUrl"/>
        <van-search placeholder="搜索商品信息" shape="round" @focus="goSearch"></van-search>
    </div>
    <!-- 搜索结束 -->
    <!-- 轮播图开始 -->
    <div class="banner">
        <van-swipe class="banner_body" autoplay="6000"  @change="changeBanner">
            <van-swipe-item v-for="image in banner" :key="image.id">
                <a href="image.url">
                    <img v-lazy="image.pic" />
                </a>
            </van-swipe-item>
            <template #indicator>
                <div class="bannerradio">
                    <span :class="{active:bannerIndex==(i-1)}" v-for="i in banner.length" :key="i"></span>
                </div>
            </template>
        </van-swipe>
    </div>
    <!-- 轮播图结束 -->
    <!-- 四宫格开始 -->
    <div class="four_grid">
        <van-grid column-num="4">
            <van-grid-item 
                :icon="m.pic"
                :text="m.name"
                v-for="m in menuGrid" 
                :to="m.wap_url"
                :key="m.id"
            ></van-grid-item>
        </van-grid>
    </div>
    <!-- 四宫格结束 -->
    <!-- 新闻滚动开始 -->
      <div class="roll_news">
        <van-notice-bar 
            :scrollable="false" 
            mode="link" 
            color="#7f7d7d" 
            background="#fff"
            left-icon="volume-o"
        >
            <van-swipe
                vertical
                class="notice-swipe"
                autoplay="3000"
                :show-indicators="false"
            >
                <van-swipe-item
                    v-for="item in rollNews"
                    :key="item.id"
                >{{item.info}}</van-swipe-item>
            </van-swipe>
        </van-notice-bar>
      </div>
    <!-- 新闻滚动结束 -->
    <!-- 快速选择开始 -->
    <div class="quickly_choose">
        <template>
            <box-title>
                <p slot="title">快速选择</p>
                <p slot="mes">{{quickChooseInfo}}</p>
            </box-title>
        </template>
        <div class="mes">
            <ul>
                <li v-for="item in quickChoose" :key="item.id" @click="gotoShop(item)">
                    <img :src="item.pic" alt=""  v-lazy="item.pic">
                    <p>{{item.cate_name}}</p>
                </li>
            </ul>
        </div>
    </div>
    <!-- 快速选择结束 -->
    <!-- 精品推荐开始 -->
    <div class="recommend_shop">
        <template>
            <box-title>
                <p slot="title">精品推荐</p>
                <p slot="mes">{{recommendInfo}}</p>
            </box-title>
        </template>
        <van-swipe class="banner_body" autoplay="6000" @change="changeBannerRec">
            <van-swipe-item v-for="image in recommendBanner" :key="image.id">
                <a :href="image.wap_link">
                    <img v-lazy="image.img" />
                </a>
            </van-swipe-item>
            <template #indicator>
                <div class="bannerradio">
                    <span :class="{active:bannerIndexRec==(i-1)}" v-for="i in recommendBanner.length" :key="i"></span>
                </div>
            </template>
        </van-swipe>
        <!-- 商品列表 -->
        <div class="shopList">
            <ul>
                <li v-for="item in recommendShop" :key="item.id" >
                    <template>
                        <shop-item :item="item">
                            <span slot="sale">已售 {{item.sales}}件</span>
                            <van-icon name="shopping-cart-o" slot="icon"/>
                        </shop-item>

                    </template>
                </li>
            </ul>
        </div>
    </div>
    <!-- 精品推荐结束 -->
    <!-- 热门榜单开始 -->
    <div class="hot_list">
        <div class="title">
            <div class="left">
                <p>热门榜单</p>
                <span>根据销量、搜索、好评等综合得出</span>
            </div>
            <div class="right">
                <p>更多</p>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="box">
            <ul>
                <li v-for="item in hotList" :key="item.id">
                    <picture-item :item="item"></picture-item>
                </li>
            </ul>
        </div>
    </div>
    <!-- 热门榜单结束 -->
    <!-- 首发新品开始 -->
    <div class="new_list">
        <div class="title">
            <template>
                <box-title>
                    <p slot="title">首发新品</p>
                    <p slot="mes">{{newInfo}}</p>
                    <van-icon name="new-arrival-o" slot="new"/>
                </box-title>
            </template>
        </div>
        <div class="shop_mes">
            <ul>
                <li v-for="item in newShop" :key="item.id">
                    <picture-item :item="item"></picture-item>
                </li>
            </ul>
        </div>
    </div>
    <!-- 首发新品结束 -->
    <!-- 促销单品开始 -->
    <div class="sale_list">
        <div class="title">
            <template>
                <box-title>
                    <p slot="title">促销单品</p>
                    <p slot="mes">{{saleInfo}}</p>
                </box-title>
            </template>
        </div>
        <div class="mes">
            <ul>
                <li v-for="item in saleShop" :key="item.id">
                    <shop-sale :item="item"></shop-sale>
                </li>
            </ul>
        </div>
    </div>
    <!-- 促销单品结束 -->
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import BoxTitle from '@/components/BoxTitle';
import ShopItem from '@/components/ShopItem';
import PictureItem from '@/components/PictureItem';
import ShopSale from '@/components/ShopSale';
export default {
  name: 'Index',
  components: {
    BoxTitle,
    ShopItem,
    PictureItem,
    ShopSale
  },
  data(){
    return{
      logoUrl:'',
      indexData:null,
      banner:[],
      bannerIndex:0,
      menuGrid:[],
      rollNews:[],
      // 快速选择
      quickChooseInfo:'',
      quickChoose:[],
      // 精品推荐
      recommendInfo:'',
      recommendBanner:[],
      bannerIndexRec:0,
      recommendShop:[],
      // 热门榜单
      hotList:[],
      // 首发新品
      newShop:[],
      newInfo:'',
      // 促销单品
      saleInfo:'',
      saleShop:[],
    }
  },
  created(){
    this.changeLoading(true);
    this.axios.get('api/index').then(d=>{
      this.indexData = d.data.data;
      // logo
      this.logoUrl = this.indexData.logoUrl;
      // banner
      this.banner=this.indexData.banner;
      // 四宫格
      this.menuGrid=this.indexData.menus;
      // 滚动新闻
      this.rollNews = this.indexData.roll;
      // 快速选择
      this.quickChooseInfo = this.indexData.info.fastInfo;
      this.quickChoose = this.indexData.info.fastList;
      // 精品推荐
      this.recommendInfo = this.indexData.info.bastInfo;
      this.recommendBanner = this.indexData.info.bastBanner;
      this.recommendShop = this.indexData.info.bastList;
      // 热门榜单
      this.hotList = this.indexData.benefit;
      // 首发新品
      this.newInfo = this.indexData.info.firstInfo;
      this.newShop = this.indexData.info.firstList.map(data=> {
          data.ot_price = data.price;
          return data;
      });
      // 促销单品
      this.saleInfo = this.indexData.info.salesInfo;
      this.saleShop = this.indexData.info.bastList.slice(0,3);

      this.changeLoading(false);
    })
  },
  methods:{
    goSearch(){
      // this.$router.push('/search');
    },
    changeBanner(index){
      this.bannerIndex=index;
    },
    changeBannerRec(index){
      this.bannerIndexRec = index;
    },
    ...mapMutations(['changeLoading']),
  },
}
</script>

<style lang="less">
.text-hidden{
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.index{
  overflow-y: auto;
  padding-bottom: 60px;
  // 搜索开始
  .search{
    display: flex;
    height: 49px;
    align-items: center;
    justify-content: center;
    .van-image{
        width: 63.5px;
        height: 22.5px;
        margin-right: 12.5px;
        
    }
    .van-search{
        width:250px;
        padding:0px 14px;
    }
  }
  // banner开始
  .banner{
    min-height:187px;
    overflow: hidden;
    .banner_body{
        width:100%;
        min-height:187px;
        .van-swipe__track{
          min-height: 187px;
        }
        img{
            width:100%;
            min-height:187px;
            display: block;
        }
        .bannerradio{
            position: absolute;
            bottom:10px;
            left:50%;
            transform: translateX(-50%);
            display: flex;
            span{
                flex:1;
                width:10px;
                height:2px;
                margin-right:10px;
                font-size:12px;
                background-color: #fff;
                &.active{
                    opacity: 0.5;
                }
            }
        }
      }
  }
  //banner结束
  // 新闻滚动开始
  .roll_news{
      background-color: #fdfbfb;
      padding: 10px 0;
      .notice-swipe {
          height: 40px;
          line-height: 40px;
      }
  }
  // 新闻滚动结束
  // 快速选择开始
  .quickly_choose{
      margin-bottom: 10px;
      // border: solid 1px red;
      .mes{
          ul{
              display: flex;
              overflow-x: auto;
              scrollbar-width: none;//火狐
              -ms-overflow-style: none;//ie
              li{
                  position: relative;
                  // border: solid 1px red;
                  margin: 0 3px;
                  img{
                      width: 100px;
                      // border: solid 1px orange;
                  }
                  p{
                      font-size: 13px;
                      text-align: center;
                      margin-top: 0px;
                      font-weight: bold;
                      margin-bottom: 10px;
                  }
                  &::after{
                      content: '';
                      position: absolute;
                      height: 1.5px;
                      width: 86%;
                      background-color: #ff421cc9;
                      bottom: 0;
                      left: 50%;
                      transform: translateX(-50%);
                  }
              }
              &::-webkit-scrollbar{
                  display: none;
              }
          }
      }
  }
  // 快速选择结束
  // 精品推荐开始
  .recommend_shop{
      position: relative;
      .banner_body{
          padding: 0 7.5px;
          min-height: 150px;
          img{
              width: 360px;
              height: 131.82px;
          }
      }
      .bannerradio{
          position: absolute;
          bottom: 6px;
          display: flex;
          padding: 0 7.5px;
          width: 92%;
          justify-content: center;
          span{
              border-radius: 50%;
              background-color: darken(#fafafa,10%);
              height: 5px;
              width:5px;
              margin: 0 5px;
              &.active{
                  background-color: #ff411c;
                  width: 12px;
                  border-radius: 5px;
              }
          }
      }
      .shopList{
          ul{
              background-color: #fafafa;
              li{
                  background-color: #fff;
                  margin: 4px 0;
              }
          }
      }
  }
  // 精品推荐结束
 // 热门榜单开始
    .hot_list{
        .title{
            background-image: linear-gradient(left top,#e31d1a,#f6632d);
            // border: solid 1px blue;
            display: flex;
            color: white;
            padding: 10px;
            justify-content: space-between;
            position: relative;
            .left{
                display: flex;
                align-items: center;
                p{
                    margin: 0;
                    font-size: 15px;
                    font-weight: bold;
                    margin-right: 10px;
                    .text-hidden;
                }
                span{
                    font-size: 13px;
                    .text-hidden;
                }
            }
            .right{
                display: flex;
                align-items: center;
                p{
                    margin: 0;
                    font-size: 13px;
                    margin-right: 4px;
                    .text-hidden;
                }
                i{
                    font-size: 13px;
                }
            }
            &::after{
                content: '';
                border-style: solid;
                height: 0;
                width: 0;
                border-width: 60px;
                border-color: #f6632d transparent;
                position: absolute;
                right: 0;
                top: 40px;
                border-bottom: none;

                border-right: none;
            }
            &::before{
                content: '';
                border-style: solid;
                height: 0;
                width: 0;
                border-width: 60px;
                border-color: #e41f1b transparent;
                position: absolute;
                left: 0;
                border-bottom: none;
                top: 40px;
                border-left: none;
            }
        }
        .box{
            background-color: #fff;
            position: relative;
            z-index: 9;
            width: 94vw;
            border-radius: 6px;
            margin: 0 auto;
            // border: solid 1px red;
            box-shadow: 0 0 0.2rem -0.1rem #aaa;
            -moz-box-shadow: 0 0 .2rem -.1rem #aaa;
            -webkit-box-shadow: 0 0 0.2rem -0.1rem #aaa;
            -o-box-shadow: 0 0 .2rem -.1rem #aaa;
            ul{
                display: flex;
                li{
                  width: 33.33%;
                }
            }
        }
    }
    // 热门榜单结束
  // 首发新品开始
  .new_list{
      margin: 6px 0;
      .shop_mes{
          border-bottom: solid 1px rgba(204, 204, 204, 0.464);
          padding-bottom: 15px;
          ul{
              display: flex;
              overflow-x: auto;
              scrollbar-width: none;//火狐
              -ms-overflow-style: none;//ie
              li{
                margin: 0 4px;
                width: 33.33%;
                border: solid 1px rgba(204, 204, 204, 0.464);
                border-radius: 10px 10px 0 0;
                box-sizing: border-box;
              }
              &::-webkit-scrollbar{
                  display: none;
              }
          }
      }
  }
  // 首发新品结束
}
</style>
