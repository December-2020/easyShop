<template>
    <div class="log_in">
        <van-tabs>
            <van-tab title="账号登录">
                <van-form @submit="onSubmit">
                    <van-field
                        v-model="account"
                        name="account"
                        left-icon="phone-o"
                        placeholder="输入手机号码"
                        :rules="[
                        {required: true, message: '请输入手机号码' },
                        {pattern:/^1[345678]\d{9}$/,message:'手机号码格式错误'}
                        ]"
                    />
                    <van-field
                        v-model="password"
                        type="password"
                        name="password"
                        left-icon="lock"
                        placeholder="填写登录密码"
                        :rules="[
                        { required: true, message: '请填写密码' },
                        {pattern:/^\w{6,18}$/, message:'密码由6-18位数字、a-z、A-Z组成'}
                        ]"
                    />
                    <div class="text">
                        <van-icon name="question-o" />
                        <span>忘记密码</span>
                    </div>
                    <div style="margin: 16px;">
                        <van-button class="sub" round block type="info" native-type="submit">登录</van-button>
                    </div>
                    <div class="change"  @click.stop="goSign">
                        <span>没有账号?</span>立即注册
                    </div>
                </van-form>
            </van-tab>
            <van-tab title="快速登录">
                <van-form @submit="onPhone">
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
                    <div style="margin: 16px;">
                        <van-button class="sub" round block type="info" native-type="submit">登录</van-button>
                    </div>
                    <div class="change" @click.stop="goSign">
                        <span>没有账号?</span>立即注册
                    </div>
                </van-form>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { mapActions,mapMutations} from 'vuex';
export default {
    data(){
        return{
            account:'',
            password:'',
            mobile:'',
            captcha:'',
            smskey:'',
            // 倒计时
            countdown:60,
        }
    },
    created(){
        // 进入网站需要key,这个key可以标示用户是否是短时间内多次点击发送验证码
        this.axios.get('/api/verify_code').then(d => {
            this.smskey = d.data.data.key;
        });
    },
    methods:{
        onSubmit(val){
            this.axios.post('api/login',val).then(d => {
                if(d.data.status == 200){
                    // 登录成功
                    // 存储token
                    this.saveToken(d.data.data.token);
                    // 异步获取用户信息
                    this.getLoginInfo(d.data.data.token);
                    this.$toast({
                        message:'登录成功',
                        icon:'success',
                        onClose:()=>{
                            this.$router.back();
                        },
                    })
                }else{
                    // 登录失败
                    this.$toast.fail(d.data.msg);
                }
            })
        },
        onPhone(){
            this.axios.post('api/login/mobile',{
                phone:this.mobile,
                captcha:this.captcha,
                spread:null
            }).then(d => {
                // 判断登录结果
                if(d.data.status == 200){
                    // 登录成功
                    let token = d.data.data.token;
                    this.saveToken(token);
                    // 不需要传token 修改了axios配置
                    this.getLoginInfo();
                    this.$toast({
                        message:'登录成功',
                        icon:'success',
                        onClose:()=>{
                            this.$router.back();
                        },
                    })
                }else{
                    // 登录失败
                    this.$toast(d.data.msg);
                }
            })
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
        goSign(){
            this.$parent.changeSign();
        },
        ...mapMutations(['saveToken']),
        ...mapActions(['getLoginInfo']),
    },
}
</script>

<style lang="less">
.log_in{
    .van-tabs{
        border-radius: 10px;
        background: white;
        .van-tab{
            font-weight: bold;
            font-size: 15px;
        }
        .van-tabs__wrap{
            border-radius: 10px;
        }
        .van-tabs__nav{
            width: 100%;
            .van-tabs__line{
                width: 60px;
                background-color: #e31d1a;
            }
        }
        .text{
            font-size: 14px;
            float: right;
            margin: 10px;
            margin-bottom: 15px;
            .van-icon{
                vertical-align: middle;
            }
            span{
                display: inline-block;
                margin-left: 4px;
                color: #295973;
            }
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
}
</style>