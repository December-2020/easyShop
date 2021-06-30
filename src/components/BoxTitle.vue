<template>
    <div class="box_title">
        <div class="left">
            <slot name="title"></slot>
            <slot name="mes"></slot>
            <slot name="new"></slot>
        </div>
        <div class="right">
            <span>更多</span>
            <van-icon name="arrow" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.box_title{
    display: flex;
    // border: solid 1px red;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    .left{
        // border: solid 1px red;
        position: relative;
        p{
            margin: 4px;
            font-size: 15px;
            &:first-child{
                font-weight: bold;
            }
            &:last-child{
                font-size: 13px;
                color: #929698;
            }
        }
        i{
            position: absolute;
            left: 70px;
            top: 0;
            color: #f6612d;
        }
    }
    .right{
        display: flex;
        align-items: center;
        font-size: 15px;
        // border: solid 1px red;
        line-height: 18px;
        color: #8b8b8b;
    }
}
</style>