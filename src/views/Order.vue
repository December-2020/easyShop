<template>
    <div class="order">
        <!-- 楼层一 -->
        <div class="floor1">
            <van-tabs type="card" @disabled="onClickDisabled">
                <van-tab title="快递配送">
                    <div class="content">
                        <van-contact-card
                            type="edit"
                            :name="currentContact.name"
                            :tel="currentContact.tel"
                            @click="onEdit"
                        />
                    </div>
                </van-tab>
                <van-tab title="到店自取" disabled>
                    <div class="content"></div>
                </van-tab>
            </van-tabs>
        </div>
        <!-- 楼层二 -->
        <div class="floor2" v-if="buyList">
            <div class="title">共{{buyList.length}}件商品</div>
            <div class="content">
                <ul>
                    <li v-for="item in shopList" :key="item.id">
                        <van-card
                            :num=item.cart_num
                            :price=item.truePrice
                            :desc=item.productInfo.attrInfo.suk
                            :title=item.productInfo.store_name
                            :thumb=item.productInfo.image
                        />
                    </li>
                </ul>
            </div>
        </div>
        <!-- 楼层三 -->
        <div class="floor3">
            <ul>
                <li>
                    <div class="l">优惠劵</div>
                    <div class="r"><span>请选择</span> <van-icon name="arrow" /></div>
                </li>
                <li>
                    <div class="l">积分抵扣</div>
                    <div class="r">
                        <span>当前积分</span>
                        <span>{{loginUser.integral}}</span>
                        <van-checkbox v-model="chekcBox" checked-color="#e93323" icon-size="16px"></van-checkbox>
                    </div>
                </li>
                <li>
                    <div class="l">会员优惠</div>
                    <div class="r">￥139.90</div>
                </li>
                <li>
                    <div class="l">快递费用</div>
                    <div class="r">免运费</div>
                </li>
            </ul>
            <div class="mes">
                <div class="t"> 备注信息</div>
                <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="150"
                    placeholder="请添加备注(150字以内)"
                    show-word-limit
                />
            </div>

        </div>
        <!-- 楼层四 -->
        <div class="floor4">
            <div class="t">支付方式</div>
            <div class="c">
                <div class="pay">
                    <div class="l weixin">
                        <i class="iconfont icon-weixin"></i>
                        微信支付
                    </div>
                    <div class="r">微信快捷支付</div>
                </div>
                <div class="pay">
                    <div class="l zhifu">
                        <i class="iconfont icon-zhifu"></i>
                        余额支付
                    </div>
                    <div class="r">可用余额: {{loginUser.now_money}}</div>
                </div>
            </div>
        </div>
        <div class="floor5">
            <div class="l">商品总价:</div>
            <div class="r">￥ {{sumPrice}}</div>
        </div>
        <van-submit-bar :price="sumPrice*100" :disabled="isDisabled" :loading="isLoading" button-text="提交订单" @submit="onSubmit" />
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    props:['orderKey','ids','buyList'],
    data() {
        return {
            currentContact: {
                name: '张三',
                tel: '13000000000',
            },
            chekcBox:false,
            message:'',
            sumPrice:0,
            isLoading:false,
            countdown:3,
            isDisabled:false,
            shopList:null,
        };
    },
    computed:{
        ...mapGetters(['loginUser'])
    },
    activated(){
        this.axios.post('api/order/computed/'+this.orderKey,{
            addressId: 3363,
            couponId: 0,
            payType: "yue",
            shipping_type: 1,
            useIntegral: 0,
        }).then(d=>{
            this.sumPrice = d.data.data.result.total_price;
            // console.log(this.buyList);
            this.shopList = this.unique(this.buyList);
        })
    },
    methods:{
        onEdit() {
            this.$toast('编辑');
        },
        onClickDisabled(){
            this.$toast('暂无服务');
        },
        // 去重
        unique(arr){
            let newArr = arr.filter((item,index,self)=>{
                return self.findIndex(el=>el.id==item.id) === index;
            })
            return (newArr);
        },
        onSubmit(){
            this.isLoading = true;
            this.$toast('生成订单中');
            // let timer = setInterval(()=>{
            //     if(this.countdown <= 1){
            //         clearInterval(timer);
            //         this.countdown = 3;
            //         this.isLoading = false;
                   
            //     }
            //     this.countdown--;
            // },1000)
            this.axios.post('api/order/create/'+this.orderKey,{
                addressId: 3363,
                bargainId: 0,
                combinationId: 0,
                couponId: 0,
                from: "weixinh5",
                mark: "",
                payType: "yue",
                phone: "",
                pinkId: 0,
                real_name: "",
                seckill_id: 0,
                shipping_type: 1,
                store_id: 0,
                useIntegral: 0,
            }).then(d=>{
                if(d.data.status == 200){
                    this.$toast(d.data.msg);
                    this.isLoading = false;
                    let id = d.data.data.result.orderId;
                    this.$router.push('/pay/'+id);
                }
            })
        },
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
.order{
    font-size: 16px;
    margin-bottom: 40px;
    background-color: #f5f5f5;
    .floor1{
        padding: 10px;
        // border: solid 1px blue;
        background: linear-gradient(top,#ea4637,#fff);
        .van-tabs{
            // margin-top: 20px;
            // background-color: white;
            .van-tabs__wrap{
                height: 40px;
                // border: solid 1px yellowgreen;
                .van-tabs__nav--card{
                    margin: 0;
                    margin-top: 10px;
                    background-color: #f7c1bd;
                    border: none;
                }
                .van-tab--disabled{
                    color: red;
                }
                .van-tab--active{
                    background: white;
                    color: red;
                    margin-top: -10px;
                    height: 40px;
                    border: none;
                    position: relative;
                    &::after{
                        content: '';
                        width: 0;
                        height: 0;
                        border-bottom: 40px solid #fff;
                        border-right: 20px solid transparent;
                        position: absolute;
                        right: -20px;
                    }
                    &::before{
                        content: '';
                        width: 0;
                        height: 0;
                        border-bottom: 40px solid #fff;
                        border-left: 20px solid transparent;
                        position: absolute;
                        left: -20px;
                    }
                }
            }
            .van-tabs__content{
                // border: solid 1px rgb(0, 255, 64);
                background-color: white;
                padding: 6px;
            }
        }
    }
    .floor2{
        padding:0 10px;
        background-color: white;
        // border: solid 1px red;
        .title{
            font-size: 13px;
            padding: 10px 0;
            border-bottom: solid 1px rgba(204, 204, 204, 0.267);
        }
        .content{
            padding-bottom: 10px;
            ul{
                li{
                    margin: 6px 0;
                    .van-card__title{
                        .text-hidden;
                    }
                    .van-card__desc{
                        margin-top: 12px;
                    }
                    .van-cell{
                        padding: 10px;
                    }
                }
            }
        }
    }
    .floor3{
        background-color: white;
        ul{
            li{
                padding: 10px;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: solid 1px rgba(204, 204, 204, 0.473);
                .r{
                    p{
                        margin: 0;
                    }
                    color: #b2b8bb;
                    display: flex;
                    align-items: center;
                    span{
                        &:nth-child(2){
                            margin: 0 6px;
                            color: #f44939;
                        }
                    }
                }
                &:nth-child(1){
                    .van-icon{
                        margin-top: 2px;
                    }
                }
            }
        }
        .mes{
            .t{
                font-size: 14px;
                padding: 10px;
                padding-bottom: 5px;
            }
            // border: solid 1px red;
            .van-cell{
                padding:5px 10px;
                .van-field__control{
                    background-color: #f9f9f9;
                    color: #ccc;
                    padding: 2px;
                    border-radius: 6px;
                }
            }
        }
    }
    .floor4{
        margin-top: 10px;
        background-color: white;
        padding: 10px;
        font-size: 14px;
        .c{
            .pay{
                display: flex;
                border: solid 1px rgba(204, 204, 204, 0.514);
                padding: 10px;
                margin: 4px 0;
                line-height: 20px;
                // align-items: center;
                justify-content: space-between;
                &:nth-child(2){
                    border-color: #f44939;
                }
                .r{
                    font-size: 12px;
                    color: #c0bdbc;
                    // border: solid 1px blue;
                    text-align: center;
                    line-height: 24px;
                }
                .l{
                    i{
                        font-size: 20px;
                        color: #fe960f;
                        margin-right: 10px;
                    }
                    .icon-weixin{
                        color: #41b035;
                    }
                }
            }
        }
    }
    .floor5{
        margin-top: 10px;
        background: white;
        display: flex;
        align-items: center;
        padding: 10px;
        justify-content: space-between;
        // border: solid 1px red;
        font-size: 14px;
        .r{
            color: #c0bdbc;
        }
    }
    .van-submit-bar__text{
        text-align: left;
    }
}
</style>