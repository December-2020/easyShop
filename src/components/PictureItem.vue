<template>
    <div class="picture_item" @click="gotoDetails(item.id)">
        <div class="img">
            <img :src="item.image" alt="" v-lazy="item.image">
        </div>
        <div class="mes">
            <p>{{item.store_name}}</p>
            <p>{{item.ot_price}}</p>
        </div>
        <slot></slot>
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
.picture_item{
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    .img{
        height: 100px;
        width: 100px;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .mes{
        padding: 4px;
        p{
            .text-hidden;
            text-align: center;
            margin: 0;
            font-size: 13px;
            &:last-child{
                margin: 4px 0;
                font-weight: bold;
                color: #ff411c;
            }
        }
    }
    .price{
        // border: solid 1px red;
        font-size: 15px;
        width: 100%;
        padding-bottom: 10px;
        .t{
            font-weight: bold;
            color: #fc4141;
            margin: 6px 0;
            padding-left: 4px;
        }
        .b{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4px;
            .l{
                display: flex;
            }
            span{
                .text-hidden;
                &:first-child{
                    font-weight: bold;
                }
                &:last-child{
                    color: #aaaaaa;
                }
            }
            img{
                width: 22px;
                margin-left: 3px;
            }
        }
    }
}
</style>