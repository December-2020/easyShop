<template>
    <div class="pay">
        <div class="content">
            <van-icon name="checked" color="#e93323"/>
            <div class="con">
                <div class="t">订单支付成功</div>
                <div class="m">
                    <ul>
                        <li>
                            <span>订单编号</span>
                            <span>{{id}}</span>
                        </li>
                        <li>
                            <span>下单时间</span>
                            <span>{{dObj.add_time_y}} {{dObj.add_time_h}}</span>
                        </li>
                        <li>
                            <span>支付方式</span>
                            <span>余额支付</span>
                        </li>
                        <li>
                            <span>支付金额</span>
                            <span>{{dObj.total_price}}</span>
                        </li>
                    </ul>
                </div>
                <div class="b">
                    <p>
                        <van-button type="danger" @click="goDispatching"  round >查看订单</van-button>
                    </p>
                    <p>
                        <van-button color="#ee0a24" @click="goIndex" round  plain>返回首页</van-button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            sumPrice:0,
            cTime:0,
            orderStr:'',
            dObj:{},
        }
    },
    activated(){
        this.axios.get('api/order/detail/'+this.id).then(d=>{
            this.dObj = d.data.data;
        })
    },
    methods:{
        goIndex(){
            this.$router.push('/');
        },
        goDispatching(){
            this.$router.push('/dispatching/'+this.id);
        },
    },
}
</script>

<style lang="less">
.pay{
    font-size: 16px;
    .content{
        min-height: 100vh;
        background-color: #f5f5f5;
        position: relative;
        border: solid 1px #f5f5f5;
        i{
            position: absolute;
            font-size: 50px;
            // border: solid 1px red;
            left: calc(~"50% - 25px");
            top: 50px;
        }
        .con{
            background-color: white;
            height: 350px;
            width: 330px;
            margin:75px auto;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 6px;
            // padding-top: 40px;
            .t{
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                border-bottom: solid 1px #f5f5f5;
                padding: 20px 0;
            }
            .m{
                margin-top: 10px;
                padding-bottom: 10px;
                border-bottom: solid 1px #f5f5f5;
                ul{
                    li{
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        span{
                            &:nth-child(2){
                                font-size: 15px;
                                color: #6f7b8b;
                            }
                        }
                    }
                }
            }
            .b{
                margin-top: 10px;
                p{
                    margin: 10px 0;
                    .van-button{
                        width: 310px;
                    }
                }
            }
        }
    }
}
</style>