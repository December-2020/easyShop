<template>
    <div class="shop_sale" @click="gotoDetails(item.id)">
        <div class="img">
            <img :src="item.image" alt=""  v-lazy="item.image">
        </div>
        <div class="mes">
            <div class="top">{{item.store_name}}</div>
            <div class="middle">促销价: ￥{{item.price}}</div>
            <div class="bottom">
                <p>日常价: ￥{{item.ot_price}}</p>
                <p>已售: {{item.sales}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['item'],
    methods:{
        gotoDetails(id){
            // console.log(id);
            this.$router.push(`/details/${id}`);
        },
    }
}
</script>

<style lang="less" scoped>
.text-hidden{
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.shop_sale{
    display: flex;
    position: relative;
    margin: 10px;
    .img{
        img{
            width: 100px;
        }
    }
    .mes{
        padding: 0 10px;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .top{
            .text-hidden;
            font-weight: bold;
            color: lighten(#000,30%);
        }
        .middle{
            border-radius: 10px 0 10px 0;
            background-image: linear-gradient(left,#f6632d,lighten(#e31d1a,5%));
            width: 130px;
            text-align: center;
            color: snow;
            font-size: 14px;
            line-height: 23px;
        }
        .bottom{
            display: flex;
            justify-content: space-between;
            p{
                margin: 0;
                font-size: 13px;
                color: darken(#ccc,30%);
                &:first-child{
                    text-decoration: line-through;
                }
            }
        }
    }
    &::after{
        content: '';
        position: absolute;
        width: 94vw;
        height: .2px;
        background: #ccc;
        left: 1vw;
        bottom: -4px;
    }
}
</style>