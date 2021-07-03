<template>
    <div class="login">
        <div class="img">
            <van-image :src="imgUrl"  lazy-load round fit="cover"></van-image>
        </div>
        <div class="mes">
            <component :is="showComponent"></component>
        </div>
        <div class="buttom"></div>
    </div>
</template>

<script>
import LogIn from '@/components/Login';
import SignIn from '@/components/SignIn';
export default {
    components:{
        LogIn,
        SignIn,
    },
    data(){
        return{
            imgUrl:'http://47.115.51.185/h5/img/logo2.47964cc3.png',
            showComponent:LogIn,
        }
    },
    methods:{
        changeSign(){
            this.showComponent = SignIn;
        },
        changeLogin(){
            this.showComponent = LogIn;
        },
    },
}
</script>

<style lang="less">
.login{
    background-image: linear-gradient(top,#f97155,#ff8a37);
    height: 100vh;
    padding-top: 40px;
    .img{
        height: 80px;
        width: 80px;
        margin: 0 auto;
        margin-bottom: 40px;
        img{
            border: solid 2px rgba(255, 255, 255, 0.74);
            border-radius: 50%;
            height: 80px;
            width: 80px;
            background-color: darken(#fff,5%);
        }
    }
    .mes{
        width: 90vw;
        margin: 0 auto;
        position: relative;
        z-index: 99;
    }
    .buttom{
        background: #ffad7a;
        height: 15px;
        width: 82vw;
        margin-left: 9vw;
        border-radius: 10px;
        position: relative;
        z-index: 0;
        &::before{
            content: '';
            position: absolute;
            height: 15px;
            width: 86vw;
            background-color: #ffc79c;
            top: -7.5px;
            left: -2vw;
            border-radius: 10px;
        }
        &::after{
            content: '';
            position: absolute;
            height: 15px;
            width: 78vw;
            z-index: -1;
            background-color: #ffad73;
            top: 7.5px;
            border-radius: 10px;
            left: 2vw;
        }
    }
}
</style>