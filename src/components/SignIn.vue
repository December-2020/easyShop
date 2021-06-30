<template>
    <div class="sign_in">
        <van-form>
            <div class="title">注册账号</div>
            <van-field
                v-model="mobile"
                name="mobile"
                left-icon="phone-o"
                placeholder="输入手机号码"
                :rules="[
                {required: true, message: '请输入手机号码' },
                {pattern:/^1[345678]\d{9}$/,message:'手机号码格式错误'}
                ]"
            />
            <van-field
                v-model="captcha"
                type="number"
                name="captcha"
                left-icon="lock"
                placeholder="填写验证码"
                :rules="[
                { required: true, message: '请填写密码' },
                {pattern:/^\d{6}$/, message:'验证码为6位'}
                ]"
            >
                <template #button>
                    <van-button round size="mini" type="primary" 
                        @click="getSms" color="#f35446" native-type="button"
                        :disabled="countdown<60"
                    >
                        {{countdown>=60?'获取验证码':`倒计${countdown}秒`}}
                    </van-button>
                </template>
            </van-field>
            <van-field
                v-model="password"
                name="password"
                left-icon="lock"
                placeholder="填写您的登录密码"
                :rules="[
                {required: true, message: '请输入密码' },
                {pattern:/^\w{6,18}$/, message:'密码由6-18位数字、a-z、A-Z组成'}
                ]"
            />
            <div style="margin: 16px;">
                <van-button class="sub" round block type="info" native-type="submit">登录</van-button>
            </div>
            <div class="change" @click.stop="goLogin">
                <span>已有账号?</span>立即登录
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            countdown:60,
            captcha:'',
            mobile:'',
            password:'',
        }
    },
    methods:{
        goLogin(){
            this.$parent.changeLogin();
        },
        getSms(){
            let mobile = this.mobile;
            // 获取验证码
            this.axios.post('api/register/verify',{
                key:this.smskey,
                phone:mobile,
                // 短信类型为登录
                type:'login',
            }).then(d => {
                // console.log(d);
                if(d.data.status == 200){
                    // 发送成功
                    this.$toast({
                        message:'发送成功',
                        icon:'success',
                        onClose:()=>{
                            // 1.按钮禁用
                            // 2. 60s倒计时
                            let timer = setInterval(()=>{
                                if(this.countdown <= 1){
                                    clearInterval(timer);
                                    this.countdown = 60;
                                    this.captcha = '';
                                    return;
                                }
                                this.countdown--;
                            },1000);
                        },
                    })
                }else{
                    // 发送失败
                    this.$toast(d.data.msg)
                }
            })
        },
    },
}
</script>

<style lang="less">
.sign_in{
    .title{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        padding: 20px 0;
    }
    .van-form{
        background-color: white;
        border-radius: 10px;
    }
    .sub{
        background-image: linear-gradient(left,#ff6646,#ff963a);
        border: none;
        font-weight: bold;
        height: 40px;
    }
    .change{
        font-size: 15px;
        text-align: center;
        padding-bottom: 14px;
        color: #fc4141;
        span{
            color: #e0e0e0;
        }
    }
}
</style>