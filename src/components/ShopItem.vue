<template>
    <div class="shop_item"  @click="gotoDetails(item.id)">
        <div class="img">
            <img :src="item.image" alt="" v-lazy="item.image">
        </div>
        <div class="mes">
            <div class="top">{{item.store_name}}</div>
            <div class="bottom">
                <div class="left">
                    <p class="price">￥ {{item.price}}</p>
                    <div class="vip_price">
                        <p>￥ {{item.vip_price}}</p>
                        <van-icon name="vip-card" />
                        <slot name="sale"></slot>
                    </div>
                </div>
                <div class="right">
                    <slot name="icon"></slot>
                    <slot name="saleRight"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['item'],
    created(){
        // console.log(this.item);
    },
    methods:{
        gotoDetails(id){
            // console.log(id);
            this.$router.push(`/details/${id}`);
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
.shop_item{
    display: flex;
    align-items: center;
    .img{
        // border: solid 1px red;
        img{
            width: 80px;
        }
    }
    .mes{
        padding: 6px;
        margin-left: 4px;
        width: 100%;
        .top{
            .text-hidden;
            font-size: 15px;
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            width: 100%;
            .left{
                .price{
                    margin: 0;
                    font-size: 15px;
                    font-weight: bold;
                    color: #ff411c;
                }
                .vip_price{
                    display: flex;
                    font-size: 13px;
                    align-items: center;
                    height: 30px;
                    p{
                        font-weight: bold;
                        color: lighten(#000,30%);
                    }
                    i{
                        margin: 0 6px;
                        font-size: 16px;
                        vertical-align: top;
                    }
                    span{
                        color: darken(#e5e5e5,20%);
                        font-size: 12px;
                    }
                }
            }
            .right{
                padding-right: 4px;
                i{
                    border: solid 1px red;
                    border-radius: 50%;
                    font-size: 16px;
                    color: #ff411c;
                    padding: 2px;
                    text-align: center;
                    line-height: 16px;
                }
                span{
                    color: darken(#e5e5e5,20%);
                    font-size: 12px;
                }
            }
        }
    }
}
</style>