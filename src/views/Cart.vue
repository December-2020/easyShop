<template>
    <div class="cart">
        <div class="title">
            <ul>
                <li>
                    <van-icon name="certificate" />
                    <span>100%正品保证</span>
                </li>
                <li>
                    <van-icon name="certificate" />
                    <span>所有商品精挑细选</span>
                </li>
                <li>
                    <van-icon name="certificate" />
                    <span>售后无忧</span>
                </li>
            </ul>
        </div>
        <div class="total">购买数量<span>{{shopNum}}</span></div>
        <div class="content">
            <div class="con_null" v-if="shopNum===0">
                <div class="img">
                    <img :src="imgUrl" alt="" v-lazy="imgUrl">
                </div>
                <div class="con_title">
                    <van-divider
                        :style="{ 
                            color: '#566a78', 
                            borderColor: '#bebebe', 
                            padding: '0 80px',
                            fontSize:'13px'
                        }"
                        >
                        为你推荐
                    </van-divider>
                </div>
                <div class="con">
                    <ul>
                        <li v-for="item in list" :key="item.id">
                            <picture-item :item="item"></picture-item>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="con_has" v-else>
                 <ul>
                    <!-- 复选框组 组件 -->
                    <van-checkbox-group v-model="result" ref="checkboxGroup">
                        <li v-for="(item,index) in shopList" :key="item.id">
                            <van-swipe-cell>
                                <div class="card">
                                    <!-- 复选框 -->
                                    <van-checkbox 
                                        :name="item" 
                                        checked-color="#ee0a24"
                                        icon-size="18px"
                                        ref="checkItem"
                                        @click="changeCheckBox()"
                                    />
                                    <van-image 
                                        :src="item.productInfo.image" 
                                        lazy-load
                                        @click="gotoDetail(item.product_id)"
                                    />
                                    <div class="mes">
                                        <p>{{item.productInfo.store_name}}</p>
                                        <p>{{item.productInfo.attrInfo.suk}}</p>
                                        <div class="bottom">
                                            <div class="l">￥{{item.truePrice}}</div>
                                            <div class="r">
                                                <span @click="reduceNum(item,index)">-</span>
                                                <input type="number" 
                                                 v-model="iptVal[index]"
                                                 @blur="changeIpt(item,index)"
                                                >
                                                <span @click="addNum(item,index)">+</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <template #right>
                                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteShop(item.id)"/>
                                </template>
                            </van-swipe-cell>
                        </li>
                    </van-checkbox-group>
                </ul>
                <div class="foot">
                    <div class="l">
                        <van-checkbox v-model="checkAll" @change="toggleeAll" checked-color="#ee0a24">全选 ({{checedkNum}})</van-checkbox>
                    </div>
                    <div class="r">
                        ￥{{checkedPrice}}
                        <van-button type="danger"  round>立即下单</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PictureItem from '@/components/PictureItem';
import {mapMutations} from 'vuex'

export default {
    components:{PictureItem},
    data(){
        return{
            imgUrl:'http://47.115.51.185/h5/img/noCart.6f2abfef.png',
            list:[],
            shopNum:0,
            result:[],
            checkAll:true,
            iptVal:[],
            checedkNum:0,
            checkedPrice:0,
            shopList:[],
        }
    },
    activated(){
        
        this.showDiv();
    },
    watch:{
        // 'shopList':{
        //     handler(){
        //         this.sumPrice();
        //         console.log(this.checkedPrice);
        //     },
        //     deep:true,
        // },
    },
    methods:{
        showDiv(){
            this.changeLoading(true);
            this.axios.get('api/cart/count').then(d=>{

                this.shopNum = d.data.data.count;
                // 购物车为空时
                if(this.shopNum === 0){
                    this.axios.get('api/product/detail/74').then(d=>{
                        this.list = d.data.data.good_list;
                    })
                }else{
                    this.axios.get('api/cart/list').then(d=>{
                        this.shopList = d.data.data.valid;
                        // console.log(this.shopList);
                        this.eachArr(this.shopList);
                        this.sumPrice();
                    })
                }
                this.changeLoading(false);
            })
        },
        eachArr(arr){
            arr.map(item => {
                this.iptVal.push(item.cart_num);
                this.result.push(item);
            })
        },
        gotoDetail(id){
            this.$router.push('/details/'+id);
        },
        // 数量+1
        addNum(item,index){
            let id = item.id;
            // 判断是否达到最大数量
            // console.log(item);
            let maxNum = item.trueStock;
            // console.log(maxNum);
            let number = ++item.cart_num ;
            if(number <= maxNum){
                this.axios.post('api/cart/num',{
                    id,
                    number,
                }).then(d=>{
                    if(d.data.status == 200){
                        this.iptVal.splice(index,1,number);
                        this.sumPrice();
                    }
                })
            }else{
                this.$toast({
                    message:'库存不足'
                })
            }
        },
        // 数量-1
        reduceNum(item,index){
            let id = item.id;
            if(item.cart_num > 1){
                let number = --item.cart_num;
                this.axios.post('api/cart/num',{
                    id,
                    number,
                }).then(d=>{
                    if(d.data.status == 200){
                        // console.log('数量修改成功',number);
                        this.iptVal.splice(index,1,number);
                        // console.log(item.cart_num);
                        this.sumPrice();
                    }
                })
            }
        },
        // 改变输入框
        changeIpt(item,index){
            let id = item.id;
            let maxNum = item.trueStock;
            let val = this.iptVal[index];
            if(val > 0 && val < maxNum){
                this.axios.post('api/cart/num',{
                    id,
                    number:val,
                }).then(d=>{
                    if(d.data.status === 200){
                        this.iptVal.splice(index,1,val);
                        this.sumPrice();
                    }else{
                        // console.log();
                        this.$toast(d.data.msg);
                    }
                })
            }else{
                this.$toast({
                    message:'输入无效'
                })
            }
        },
        // 单选控制全选
        changeCheckBox(){
            if(this.result.length == this.shopList.length && this.result.length != 0){
                this.checkAll = true;
            }else{
                this.checkAll = false;
            }
            this.sumPrice();
        },
        // 反选
        toggleeAll(){
            if(this.checkAll){
                this.result = [...this.shopList];
            }else{
                this.result = [];
            }
            this.sumPrice();
        },
        // 去重
        unique(arr){
            let newArr = arr.filter((item,index,self)=>{
                return self.findIndex(el=>el.id==item.id) === index;
            })
            return (newArr);
        },
        // 总价
        sumPrice(){
            let arr = this.unique(this.result);
            let sum = 0;
            let totalNum = 0;
            arr.map(item => {
                sum += item.truePrice * item.cart_num;
                totalNum += item.cart_num;
            })
            this.checkedPrice = sum.toFixed(1);
            this.checedkNum = totalNum;
        },
        // 删除
        deleteShop(id){
            // console.log(id);
            this.axios.post('api/cart/del',{
                ids:[id]
            }).then(d=>{
                if(d.data.status == 200){
                    this.$toast('删除成功');
                    this.showDiv();
                }
            })
        },
        ...mapMutations(['changeLoading'])
    }
}
</script>

<style lang="less">
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.cart{
    font-size: 14px;
    background-color: #f5f5f5;
    min-height: 100vh;
    padding-bottom: 95px;
    position: relative;
    .title{
        margin: 0;
        padding: 0;
        ul{
            background-color: #f5f5f5;
            padding: 6px;
            display: flex;
            li{
                font-size: 12px;
                flex: 1;
                text-align: center;
                // border: solid 1px red;
                color: #92918ce8;
            }
        }
    }
    .total{
        padding: 6px;
        background-color: white;
        // border: solid 1px red;
        span{
            display: inline-block;
            margin-left: 4px;
            color: #fd7e53;
        }
    }
    .content{
        background-color: white;
        margin-top: 10px;
        .con_null{
            padding-top: 20px;
            .img{
                width: 207px;
                height: 168px;
                // border: solid 1px red;
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .con{
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    padding: 0 10px;
                    li{
                        width: 45%;
                        margin: 6px;
                        // border: solid 1px red;
                        .picture_item{
                            // border: solid 1px red;
                            width: 100%;
                            .img{
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
        .con_has{
            position: relative;
            ul{
                .van-checkbox-group{
                    background-color: #f5f5f5;
                    li{
                        margin: 6px 0;
                        background-color: #fff;
                        .card{
                            // border: solid 1px red;
                            display: flex;
                            padding: 10px;
                            .van-checkbox{
                                padding-right: 8px;
                            }
                            .van-image{
                                width: 140px;
                                height: 80px;
                                margin: 0 10px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                    border-radius: 10px;
                                }
                            }
                            .mes{
                                display: flex;
                                flex-direction: column;
                                justify-content: space-evenly;
                                p{
                                    margin: 0;
                                    font-size: 13px;
                                    // border: solid 1px red;
                                    width: 240px;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    &:nth-child(1){
                                        font-weight: bold;
                                    }
                                    &:nth-child(2){
                                        font-size: 10px;
                                        color: #978a90;
                                    }
                                }
                                .bottom{
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    .r{
                                        display: flex;
                                        align-items: center;
                                        input{
                                            width: 20px;
                                            height: 14px;
                                            text-align: center;
                                        }
                                        span{
                                            border: solid 1px #ccc;
                                            display: inline-block;
                                            width: 24px;
                                            text-align: center;
                                            padding: 0.5px;
                                        }
                                    }
                                }
                            }
                        }
                        .van-swipe-cell__right{
                            height: 100px;
                            // border: solid 1px orange;
                            .delete-button{
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .foot{
                border-bottom: solid 1px rgba(223, 223, 223, 0.363);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding:4px 10px;
                margin-top: 10px;
                position: fixed;
                background-color: white;
                width: 94.5vw;
                bottom: 50px;
                .l{
                    i{
                        margin-right: 6px;
                    }
                }
                .r{
                    display: flex;
                    align-items: center;
                    color: #fc4141;
                    font-size: 16px;
                    button{
                       height: 34px; 
                       width: 96px;
                       margin-left: 10px;
                    }
                }
            }
        }
    }
}
</style>