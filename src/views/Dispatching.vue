<template>
    <div class="dispatching">
        <div class="floor1">
            <van-image 
                width="55"
                height="55" 
                src="http://datong.crmeb.net/public/uploads/attach/2019/03/28/5c9ccca12638a.gif" 
                lazy-load
            />
            <div class="r">
                <p>商家未发货,请耐心等待</p>
                <p>{{dObj.add_time_y}} {{dObj.add_time_h}}</p>
            </div>
        </div>
        <div class="floor2">
            <van-steps :active="active" active-color="#e93323">
                <van-step>待付款</van-step>
                <van-step>代发货</van-step>
                <van-step>待收货</van-step>
                <van-step>待评价</van-step>
                <van-step>已完成</van-step>
            </van-steps>
            <van-contact-card
                type="edit"
                :name="currentContact.name"
                :tel="currentContact.tel"
            />
        </div>
        <div class="floor3">
            <div class="t">共{{list.length}}件商品</div>
            <div class="m">
                <ul>
                    <li v-for="(item,index) in list" :key="index">
                        <van-card
                            :num="item.cart_num"
                            :price="item.truePrice"
                            :desc="item.productInfo.attrInfo.suk"
                            :title="item.productInfo.store_name"
                            :thumb="item.productInfo.image"
                        />
                    </li>
                </ul>
            </div>
            <div class="b">
                <van-icon name="service-o" />
                <span>联系客服</span>
            </div>
        </div>
        <div class="floor4">
            <div>
                <span>订单编号:</span>
                <span>{{id}}<span class="copy">复制</span></span>
            </div>
            <div>
                <span>下单时间:</span>
                <span>{{dObj.add_time_y}} {{dObj.add_time_h}}</span>
            </div>
            <div>
                <span>订单类型:</span>
                <span>普通订单</span>
            </div>
            <div>
                <span>支付状态:</span>
                <span>已支付</span>
            </div>
            <div>
                <span>支付方式:</span>
                <span>余额支付</span>
            </div>
            <div>
                <span>买家留言:</span>
                <span>无</span>
            </div>
        </div>
        <div class="floor5">
            <div class="t">
                <span>支付金额:</span>
                <span>￥{{dObj.pay_price}}</span>
            </div>
            <div class="m t">
                <span>运费:</span>
                <span>{{dObj.freight_price}}</span>
            </div>
            <div class="b">实付款: <span>￥{{dObj.total_price}}</span></div>
        </div>
        <div class="floor6">
            <van-button plain round color="#aab2c8" disabled  type="info">申请退款</van-button>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    props:['id'],
    data(){
        return{
            ctime:0,
            active:1,
            currentContact: {
                name: '张三',
                tel: '13000000000',
            },
            list:[],
            dObj:{},
        }
    },
    activated(){
        this.changeLoading(true);
        this.axios.get('api/order/detail/'+this.id).then(d=>{
            // console.log(d.data.data);
            this.dObj = d.data.data;
            // real_name
            this.currentContact={
                name:this.dObj.real_name,
                tel:this.dObj.user_phone,
            }
            this.list = this.dObj.cartInfo;
            this.changeLoading(false);
        })
    },
    methods:{
        ...mapMutations(['changeLoading'])
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
.dispatching{
    font-size: 15px;
    background-color: #f5f5f5;
    .floor1{
        padding: 10px;
        background-color: #e93323;
        display: flex;
        align-items: center;
        p{
            margin: 0;
            color: #fef7f7;
            font-size: 14px;
        }
        .r{
            margin-left: 10px;
            p{
                &:nth-child(1){
                    font-size: 15px;
                    font-weight: bold;
                    margin-bottom: 4px;
                }
            }
        }
    }
    .floor2{
        padding: 10px;
        background-color: white;
    }
    .floor3{
        margin: 5px 0;
        background-color: white;
        .t{
            padding: 10px;
        }
        .m{
            border: solid 1px rgba(204, 204, 204, 0.349);
            border-left: none;
            border-right: none;
            ul{
                li{
                    .van-card{
                        background-color: white;
                        // border: solid 1px red;
                        .van-card__content{
                            .van-card__title{
                                // border: solid 1px red;
                                // width: 245px;
                                // overflow: hidden;
                                // text-overflow: ellipsis;
                                // white-space: nowrap;
                                .text-hidden;
                            }
                            .van-card__desc{
                                margin: 10px 0;
                                color: #9c9298;
                            }
                            .van-card__bottom{
                                .van-card__price{
                                    color: #e93323;
                                }
                            }
                        }
                    }
                }
            }
        }
        .b{
            padding: 10px;
            text-align: center;
            color: #ee5f4c;
            span{
                margin-left: 4px;
            }
        }
    }
    .floor4{
        padding: 10px;
        background-color: white;
        margin: 5px 0;
        div{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px;
            span{
                &:nth-child(2){
                    color: #868686;
                }
                .copy{
                    border: solid 1px #868686;
                    font-size: 12px;
                    padding: 2px;
                    margin-left: 20px;
                    width: 40px;
                    display: inline-block;
                    text-align: center;
                    color: #333333;
                }
            }
        }
    }
    .floor5{
        background-color: white;
        margin: 5px 0;
        .t{
            padding: 10px;
            display: flex;
            justify-content: space-between;
            span{
                &:nth-child(2){
                    color: #868686;
                }
            }
        }
        .b{
            padding: 10px;
            text-align: right;
            position: relative;
            span{
                font-weight: bold;
                color: #fc4141;
            }
            &::before{
                content: '';
                position: absolute;
                top: 0;
                left: 12.5px;
                border-top: solid 1px #f5f5f5;
                width: 350px;
                height: 0;
            }
        }
    }
    .floor6{
        padding: 10px;
        background: #fff;
        text-align: right;
        .van-button{
            height: 36px;
        }
    }
}
</style>