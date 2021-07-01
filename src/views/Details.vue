<template>
  <div class="details" v-if="detailData">
    <div class="banner">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ banner.length }}
          </div>
        </template>
      </van-swipe>
    </div>
    <div class="mes">
      <div class="top">
        <div class="top_l">
          <p><span>￥</span>{{ storeInfo.price }}</p>
          <p><span>￥</span>{{ storeInfo.vip_price }}</p>
          <van-image
            lazy-load
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAVCAYAAAA5BNxZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphNmVhODdiZC0zYWY5LTEzNDYtYjYyYy1hZGE1MDVmMDUxMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MURGMzA2REQyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MURGMzA2REMyMDNEMTFFOTkxOUVDOTNCMjU4MDcwQjQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODk2ZWFjMGYtNDI3MC0yZDRlLThiYTItYjE4OTA2YzRiOWVlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDg3NDQyZTItM2M1ZC1iNDRkLTljYmUt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"
          />
        </div>
        <div class="top_r">
          <van-icon name="share-o" />
        </div>
      </div>
      <div class="middle">{{ storeInfo.store_name }}</div>
      <div class="bottom">
        <ul>
          <li>原价: ￥{{ storeInfo.ot_price }}</li>
          <li>库存: {{ storeInfo.stock }}件</li>
          <li>销量: {{ storeInfo.fsales }}件</li>
        </ul>
      </div>
    </div>
    <!-- 尺码选择 -->
    <div class="choose" @click="chooseSku" v-if="showChoose">
      <div>
        <div class="left" v-if="s1Text != '' || s2Text != ''">
          已选择: <span>{{ s1Text }} {{ s2Text }}</span>
        </div>
        <div class="left" v-else>未选择</div>
      </div>
      <div class="right">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 评价开始 -->
    <div class="assess">
      <div class="left">用户评价<span>(0)</span></div>
      <div class="right">
        <span>0%</span>
        <span>好评率</span>
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 评价结束 -->
    <!-- 优品推荐开始 -->
    <div class="recommend">
      <div class="title">优品推荐</div>
      <div class="content">
        <van-swipe>
          <van-swipe-item>
            <ul>
              <li v-for="item in list1" :key="item.id" >
                <picture-item :item="item"></picture-item>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <li v-for="item in list2" :key="item.id">
                <picture-item :item="item"></picture-item>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <li v-for="item in list3" :key="item.id">
                <picture-item :item="item"></picture-item>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 优品推荐结束 -->
    <!-- 产品介绍 -->
    <div class="productInfo">
      <div class="title">产品介绍</div>
      <div class="content" v-html="storeInfo.description"></div>
    </div>
    <div class="cartMes">
      <van-goods-action>
        <van-goods-action-icon icon="service-o" text="客服" color="#666666" />
        <van-goods-action-icon icon="star-o" color="#666666" text="收藏" />
        <van-goods-action-icon icon="cart-o" to="/cart" color="#666666" v-if="cartCount === 0 " text="购物车" />
        <van-goods-action-icon icon="cart-o" to="/cart" color="#666666" v-else :badge="cartCount" text="购物车" />
        <van-goods-action-button
          type="warning"
          @click="chooseSku"
          text="加入购物车"
        />
        <van-goods-action-button type="danger" @click="goBuy" text="立即购买" />
      </van-goods-action>
    </div>
    <div class="cart">
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="storeInfo.cate_id"
        @add-cart="addCart"
        @sku-selected="skuSelected"
        @buy-clicked="onBuyClicked"
      />
    </div>
  </div>
</template>

<script>
import PictureItem from "@/components/PictureItem";
import { mapMutations, mapGetters } from "vuex";

export default {
  props: ["id"],
  components: { PictureItem },

  data() {
    return {
      detailData: {},
      banner: [],
      current: 0,
      storeInfo: {},
      list1: [],
      list2: [],
      list3: [],
      show: false,
      showChoose: false,
      cartCount:0,
      sku: {
        //初始化demo数据
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", //属性名称
            k_id: "1", //属性的ID值 唯一 在当前产品里面唯一
            v: [
              //颜色属性可用值列表
              {
                id: "30349", //属性ID
                name: "红色", //属性名
                //属性图片，默认只有第一行属性有
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1215",
                name: "白色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
              {
                id: "1216",
                name: "棕色",
                imgUrl: "https://b.yzcdn.cn/vant/sku/shoes-1.png",
              },
            ],
            k_s: "s1", //属性的k_s值 对应list里面组合键名
          },
          {
            k: "尺寸",
            k_id: "2",
            v: [
              {
                id: "1193",
                name: "30码",
              },
              {
                id: "1194",
                name: "40码",
              },
            ],
            k_s: "s2",
            count: 2,
          },
        ],
        // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
        list: [
          {
            id: 2300,
            price: 500,
            s1: "1216",
            s2: "1193",
            stock_num: 100,
            goods_id: 123123,
          },
          {
            id: 2259,
            price: 120, //价格
            s1: "1215", //对应属性列表里面 k_s 等于s1的属性id值
            s2: "1193",
            stock_num: 20, //库存
            goods_id: 946755, //产品ID
          },
          {
            id: 2260,
            price: 110,
            s1: "1215",
            s2: "1194",
            stock_num: 2,
            goods_id: 946755,
          },
          {
            id: 2257,
            price: 130,
            s1: "30349",
            s2: "1193",
            stock_num: 40,
            goods_id: 946755,
          },
          {
            id: 2258,
            price: 100,
            s1: "30349",
            s2: "1194",
            stock_num: 50,
            goods_id: 946755,
          },
        ],
        price: "500.00",
        stock_num: 227, // 商品总库存
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "",
      },
      s1Text: "",
      s2Text: "",
    };
  },
  created() {
    // console.log(this.id);
  },
  mounted(){
    this.goShopDetail(this.id);
  },
  watch:{
    id:{
      handler(newVal){
        // console.log(newVal);
        this.goShopDetail(newVal);
      },
      // deep:true,
    }
  },
  computed: {
    ...mapGetters(['loginUser']),
  },
  methods: {
    goBuy(){
      this.show = true;
    },
    onBuyClicked(event){
      if(this.loginUser){
        this.addCart(event);
        this.$router.push('/cart');
      }else{
        this.$router.push('/login');
      }
    },
    onChange(index) {
      this.current = index;
    },
    chooseSku() {
      this.show = true;
    },
    addCart(event){
      if(this.loginUser){
        let uniqueId = '';
        let str = '';
        if(this.s2Text  === ''){
          str = this.s1Text
        }else{
          str = `${this.s1Text},${this.s2Text}`;
        }
        let obj = this.detailData.productValue;
        for(let i in obj){
          if(obj[i].suk.indexOf(str) != -1){
            uniqueId = obj[i].unique;
            break;
          }
        }
        this.axios.post('api/cart/add',{
          cartNum:event.selectedNum,
          new:0,
          productId:this.id,
          uniqueId,
        }).then(d=>{
          if(d.data.status === 200){
            this.$toast({
              message:'添加成功'
            })
            this.getShopCount(1);
          }
        })
      }else{
        this.$router.push('/login');
      }
      this.show = false;
    },

    skuSelected(event) {
      // console.log(event);
      if (event.skuValue.skuKeyStr == "s1") {
        this.s1Text = event.skuValue.name;
        // console.log(this.s1Text);
      } else if (event.skuValue.skuKeyStr == "s2") {
        this.s2Text = event.skuValue.name;
      }
    },
    getShopCount(params){
      if(!params){
        this.axios.get('api/cart/count').then(d=>{
          this.cartCount = d.data.data&&d.data.data.count?d.data.data.count:0;
          // console.log(this.cartCount);
        })
      }else{
        this.axios.get('api/cart/count?numType=0').then(d=>{
          this.cartCount = d.data.data&&d.data.data.count?d.data.data.count:0;
        })
      }
    },
    goShopDetail(id){
      this.changeLoading(true);
      this.getShopCount();
      this.axios.get(`api/product/detail/${id}`).then((d) => {
        this.detailData = d.data.data;
        this.banner = this.detailData.storeInfo.slider_image;
        // console.log(this.banner);
        this.storeInfo = this.detailData.storeInfo;
        // console.log(this.storeInfo);
        // 分页轮播
        this.list1 = this.detailData.good_list.slice(0, 6);
        this.list2 = this.detailData.good_list.slice(6, 12);
        this.list3 = this.detailData.good_list.slice(12, 18);
        // sku

        this.sku.price = this.storeInfo.price;
        this.sku.stock_num = this.storeInfo.stock;
        // console.log(this.detailData);
        if (this.detailData.productAttr.length >= 1) {
          this.showChoose = true;
        } else {
          this.showChoose = false;
        }
        // sku 选项
        let arrs = d.data.data.productAttr;
        let listValue = d.data.data.productValue;
        this.goodsId = this.id;
        // this.goods=d.data.data.storeInfo;
        //sku 数据转换
        let id = 1;
        let idobj = {};
        let ssk = 1;
        this.sku.list = [];
        //获取产品属性里面第一个值默认图片
        if (listValue.length == 0) {
          this.goods.picture = this.storeInfo.image;
        } else {
          this.goods.picture = listValue[Object.keys(listValue)[0]].image;
        }
        //循环产品属性 组装购物车 属性tree
        this.sku.tree = arrs.map((atr, ads) => {
          let va = atr.attr_value.map((at, index) => {
            id++;
            idobj[at.attr] = id;
            let attrs = {
              id: id,
              name: at.attr,
            };
            if (ads < 1) {
              attrs.imgUrl = listValue[Object.keys(listValue)[index]].image;
            }
            return attrs;
          });
          var ks = "s" + ssk;
          ssk++;
          return {
            k: atr.attr_name,
            k_id: atr.attr_name,
            v: va,
            k_s: ks,
          };
        });
        //循环产品属性组合,组装sku 列表
        for (let key in listValue) {
          let v = listValue[key];
          let keys = key.split(",");
          this.sku.list.push({
            id: v.unique,
            price: v.price * 100, //价格
            s1: idobj[keys[0]],
            s2: idobj[keys[1]],
            stock_num: v.stock, //库存
            goods_id: v.product_id,
            imgUrl: v.image,
          });
        }
        this.detail = d.data.data;
        this.changeLoading(false);
      });
    },
    ...mapMutations(["changeLoading",]),
  },
};
</script>

<style lang="less">
html{
  background-color: #fafafa;
}
.details {
  // background-color: #f5f5f5;
  padding-bottom: 60px;
  .banner {
    position: relative;
    .van-swipe-item {
      img {
        width: 375px;
        height: 375px;
      }
    }
    .custom-indicator {
      // border: solid 1px red;
      border-radius: 4px;
      position: absolute;
      bottom: 15px;
      right: 15px;
      background-color: white;
      font-size: 12px;
      padding: 2px 4px;
    }
  }
  .mes {
    padding: 0 10px;
    background-color: white;
    margin-top: -5px;
    padding-bottom: 16px;
    .top {
      display: flex;
      // border: solid 1px red;
      justify-content: space-between;
      height: 30px;
      .top_l {
        display: flex;
        align-items: center;
        p {
          font-size: 18px;
          color: #fc4141;
          font-weight: bold;
          &:nth-child(2) {
            font-size: 12px;
            // border: solid 1px orange;
            margin-left: 6px;
            color: #000;
          }
          span {
            font-size: 12px;
          }
        }
        img {
          width: 20px;
          height: auto;
          margin-left: 4px;
        }
      }
      .top_r {
        // border: solid 1px red;
        height: 30px;
        i {
          font-size: 18px;
        }
      }
    }
    .middle {
      font-size: 16px;
      font-weight: bold;
      margin: 10px 0;
    }
    .bottom {
      // margin-bottom: 16px;
      ul {
        display: flex;
        li {
          flex: 1;
          // border: solid 1px red;
          font-size: 11px;
          color: #898b96;
          &:nth-child(2) {
            text-align: center;
          }
          &:nth-child(3) {
            text-align: right;
          }
        }
      }
    }
  }
  // 尺码
  .choose {
    font-size: 16px;
    margin: 0;
    padding: 0;
    margin: 10px 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .left {
      font-size: 14px;
      color: #82848f;
      span {
        font-size: 16px;
        color: #000;
      }
    }
    .right {
      display: flex;
      align-items: center;
      i {
        color: #8d8d8d;
      }
    }
  }
  // 评价
  .assess {
    font-size: 16px;
    margin: 0;
    padding: 0;
    margin: 10px 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .left {
      span {
        font-size: 15px;
        margin-left: 2px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        &:nth-child(1) {
          color: #fc4343;
          font-size: 14px;
        }
        &:nth-child(2) {
          margin: 0 4px;
          font-size: 15px;
          color: #b7b7b7;
        }
      }
      .van-icon {
        color: #8d8d8d;
      }
    }
  }
  // 推荐
  .recommend {
    font-size: 16px;
    margin: 0;
    padding: 0;
    background-color: white;
    margin: 10px 0;
    padding: 10px;
    .title {
      // border: solid 1px red;
      text-align: center;
      color: #f33a17;
      position: relative;
      margin: 10px 0;
      &::after {
        content: "";
        position: absolute;
        height: 3px;
        width: 3px;
        background-color: #f33a17;
        top: ~"calc(50% - 4.5px)";
        right: ~"calc(50% - 60px)";
        border: solid 3px lighten(#f33a17, 40%);
        transform: rotateZ(45deg);
      }
      &::before {
        content: "";
        position: absolute;
        height: 3px;
        width: 3px;
        background-color: #f33a17;
        top: ~"calc(50% - 4.5px)";
        // margin-right: 24px;
        left: ~"calc(50% - 60px)";
        border: solid 3px lighten(#f33a17, 40%);
        transform: rotateZ(45deg);
      }
    }
    .content {
      .van-swipe {
        padding-bottom: 10px;
        .van-swipe-item {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 33%;
            }
          }
        }
        .van-swipe__indicators {
          bottom: 0px;
          // border: solid 1px red;
        }
      }
    }
  }
  // 产品
  .productInfo {
    font-size: 16px;
    margin: 0;
    padding: 0;
    background-color: white;
    padding: 10px;
    // overflow: hidden;
    .title {
      text-align: center;
      // border: solid 1px red;
      height: 30px;
      border-bottom: 1px solid #fafafa;
    }
    .content{
      // width: 100%;
      // overflow: hidden;
      p{
        img{
          width: 100%;
        }
      }
      div{
        height: 355px  !important;
        width: 355px !important;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  // 购物车
  .cartMes {
    .van-goods-action {
      // border: solid 1px red;
      .van-goods-action-icon {
        font-size: 12px;
        // border: solid 1px red;
        .van-icon {
          // border: solid 1px red;
          display: inline-block;
          margin: 0 auto;
          font-size: 22px;
          margin-bottom: 4px;
        }
      }
    }
  }
}
</style>