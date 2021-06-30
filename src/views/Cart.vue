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
            <div class="con_null" >
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
        </div>
    </div>
</template>

<script>
import PictureItem from '@/components/PictureItem';
// import { mapMutations, mapGetters } from "vuex";
import {mapMutations} from 'vuex'

export default {
    components:{PictureItem},
    data(){
        return{
            imgUrl:'http://47.115.51.185/h5/img/noCart.6f2abfef.png',
            list:[],
            shopNum:0,
        }
    },
    created(){
        this.changeLoading(true);
        this.axios.get('api/cart/list').then(d=>{
            this.list = d.data.data.valid;
            console.log(this.list);
        })
        this.axios.get('api/cart/count').then(d=>{
            this.shopNum = d.data.data.count;
            console.log(this.shopNum);
        })
        this.changeLoading(false);
    },
    methods:{
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
    padding-bottom: 50px;
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
                    li{
                        width: 45%;
                        margin: 6px;
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
                                    .text-hidden;
                                    font-size: 13px;
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