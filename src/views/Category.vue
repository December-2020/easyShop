<template>
  <div class="category">
     <van-search shape="round" @focus="jumpSearch" placeholder="请输入产品名称" />
      <van-tabs scrollspy sticky>
        <!-- 循环一级分类 -->
        <van-tab v-for="cate in category" :key="cate.id" :title="cate.cate_name">
          <div class="right">
            <van-divider 
                :style="{ borderColor: '#000', padding: '0 30px' }"
            ><h3>{{cate.cate_name}}</h3></van-divider>
            <ul class="children">
              <!-- 循环子分类 -->
              <router-link tag="li" v-for="c in cate.children" :key="c.id" :to="`/shop/${c.id}?title=${c.cate_name}`">
                <van-image :src="c.pic"/>
                <span>{{c.cate_name}}</span>
              </router-link>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default{
  name:"Category",
  data(){
    return {
      category:[]
    }
  },
  created(){
    this.changeLoading(true);
    this.$axios.get('api/category').then(d=>{
      this.category=d.data.data;
      this.changeLoading(false)
    })
  },
  methods:{
    jumpSearch(){
      this.$router.push('/search')
    },
    ...mapMutations(['changeLoading'])
  }
}
</script>

<style lang="less">
.right{
    h3{
      text-align: center;
      font-size:14px;
      color: #000;
    }
    .children{
      display:flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li{
        width:33%;
        img{
          display: block;
          width:100%;
        }
        span{
          font-size:12px;
          display: block;
          text-align: center;
        }
      }
    }
}
.category{
  padding-bottom: 60px;
  .van-tabs--line {
    .van-tabs__wrap{
      position: fixed;
      width:90px;
      left:0px;
      z-index:1;
      height:auto;
      overflow: auto;
      padding:0px 0px;
      .van-tabs__nav{
        display: flex;
        flex-wrap: wrap;
        padding:0px 0px;
        .van-tab{
          width:100%;
          line-height:40px;

          span{
            &.van-tab__text{
              font-size:13px;
              color:#666;
              font-size:13px;
            }
          }

        }
        .van-tab--active{
          background-color: #fff;
          border-left: 1px solid #fc4141;
          width: 100%;
          text-align: center;
          color: #fc4141;
          span{
            &.van-tab__text{
              color:red;
            }
          }
        }
        .van-tabs__line{
          display: none;
        }
      }
    }
  }
  .van-tabs__content{
    padding-left:90px;
    
  }
}
</style>